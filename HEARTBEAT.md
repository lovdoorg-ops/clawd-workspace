# HEARTBEAT.md

## 1. CRON QUEUE CHECK (mandatory, always first)

Read `/root/clawd/cron-queue.json`. For any task with status `pending` or `failed` (older than 5 min):
1. Update status to `in-progress`, set `startedAt`
2. Spawn a sub-agent with `sessions_spawn` to handle the task
3. Sub-agent task text should include: the original task + instructions to update queue on completion

For tasks `in-progress` longer than 30 min with no update: mark as `failed`, will retry next heartbeat.

## 2. Regular heartbeat checks

If queue is empty or all tasks handled, reply HEARTBEAT_OK.
