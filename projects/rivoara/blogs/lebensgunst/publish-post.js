const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Config
const GHOST_URL = 'https://lebensgunst.de';
const ADMIN_API_KEY = '68fbb34dc658e000011583fc:05f9674ebe2745b655caab16c5ce8d4fbf1762532450f3d24b1e859aaf5f6d35';
const IMAGE_PATH = '/root/clawd/projects/rivoara/blogs/lebensgunst/nanobanana-output/featured_resized.png';

// Parse admin key
const [id, secret] = ADMIN_API_KEY.split(':');

// Create JWT
function createToken() {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 5 * 60; // 5 minutes
  
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT', kid: id })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({ iat, exp, aud: '/admin/' })).toString('base64url');
  
  const signature = crypto
    .createHmac('sha256', Buffer.from(secret, 'hex'))
    .update(`${header}.${payload}`)
    .digest('base64url');
  
  return `${header}.${payload}.${signature}`;
}

// Upload image via curl
function uploadImage() {
  const token = createToken();
  
  const result = execSync(`curl -s -X POST "${GHOST_URL}/ghost/api/admin/images/upload/" \
    -H "Authorization: Ghost ${token}" \
    -F "file=@${IMAGE_PATH};type=image/png"`, { encoding: 'utf-8' });
  
  const data = JSON.parse(result);
  if (data.errors) {
    throw new Error(`Image upload failed: ${JSON.stringify(data.errors)}`);
  }
  return data.images[0].url;
}

// Convert markdown to HTML (simple conversion)
function markdownToHtml(md) {
  let html = md;
  
  // Remove front matter if any
  html = html.replace(/^---[\s\S]*?---\n*/m, '');
  
  // Convert headers
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  
  // Convert bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  
  // Convert links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  
  // Convert blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');
  
  // Convert horizontal rules
  html = html.replace(/^---$/gm, '<hr>');
  
  // Convert tables
  const tableRegex = /\|(.+)\|\n\|[-| ]+\|\n((?:\|.+\|\n?)+)/g;
  html = html.replace(tableRegex, (match, header, body) => {
    const headers = header.split('|').filter(h => h.trim()).map(h => `<th>${h.trim()}</th>`).join('');
    const rows = body.trim().split('\n').map(row => {
      const cells = row.split('|').filter(c => c.trim()).map(c => `<td>${c.trim()}</td>`).join('');
      return `<tr>${cells}</tr>`;
    }).join('\n');
    return `<table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`;
  });
  
  // Convert code blocks
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
  
  // Convert inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // Convert ordered lists (numbered)
  const orderedListRegex = /(?:^[0-9]+\. .+$\n?)+/gm;
  html = html.replace(orderedListRegex, (match) => {
    const items = match.trim().split('\n').map(item => {
      return `<li>${item.replace(/^[0-9]+\. /, '')}</li>`;
    }).join('\n');
    return `<ol>\n${items}\n</ol>`;
  });
  
  // Convert paragraphs (lines that don't start with HTML tags)
  const lines = html.split('\n');
  const processedLines = [];
  let inList = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines
    if (!line) {
      processedLines.push('');
      continue;
    }
    
    // Skip if already HTML
    if (line.startsWith('<')) {
      processedLines.push(line);
      continue;
    }
    
    // Handle list items with dash
    if (line.startsWith('- ')) {
      if (!inList) {
        processedLines.push('<ul>');
        inList = true;
      }
      processedLines.push(`<li>${line.substring(2)}</li>`);
      continue;
    } else if (inList) {
      processedLines.push('</ul>');
      inList = false;
    }
    
    // Regular paragraph
    processedLines.push(`<p>${line}</p>`);
  }
  
  if (inList) {
    processedLines.push('</ul>');
  }
  
  return processedLines.join('\n');
}

// Create post via curl
function createPost(imageUrl) {
  const token = createToken();
  
  const markdown = fs.readFileSync('/root/clawd/projects/rivoara/blogs/lebensgunst/drafts/2026-01-30-nach-deutschland-gezogen-haarausfall.md', 'utf-8');
  
  // Extract title from first H1
  const titleMatch = markdown.match(/^# (.+)$/m);
  const title = titleMatch ? titleMatch[1] : 'Nach Deutschland gezogen — und plötzlich fallen die Haare aus';
  
  // Convert content (without the first title)
  const contentWithoutTitle = markdown.replace(/^# .+\n+/, '');
  const html = markdownToHtml(contentWithoutTitle);
  
  const postData = {
    posts: [{
      title: title,
      html: html,
      feature_image: imageUrl,
      status: 'published'
    }]
  };
  
  // Write to temp file to avoid shell escaping issues
  const tempFile = '/tmp/ghost-post.json';
  fs.writeFileSync(tempFile, JSON.stringify(postData));
  
  const result = execSync(`curl -s -X POST "${GHOST_URL}/ghost/api/admin/posts/?source=html" \
    -H "Authorization: Ghost ${token}" \
    -H "Content-Type: application/json" \
    -d @${tempFile}`, { encoding: 'utf-8' });
  
  const data = JSON.parse(result);
  if (data.errors) {
    throw new Error(`Post creation failed: ${JSON.stringify(data.errors)}`);
  }
  return data.posts[0];
}

// Main
async function main() {
  try {
    console.log('Uploading image...');
    const imageUrl = uploadImage();
    console.log('Image uploaded:', imageUrl);
    
    console.log('Creating post...');
    const post = createPost(imageUrl);
    console.log('Post created:', JSON.stringify({
      id: post.id,
      title: post.title,
      url: post.url,
      feature_image: post.feature_image
    }, null, 2));
    
    // Output for parsing
    console.log('---OUTPUT---');
    console.log(JSON.stringify({
      ghostId: post.id,
      ghostUrl: post.url,
      featureImage: post.feature_image
    }));
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
