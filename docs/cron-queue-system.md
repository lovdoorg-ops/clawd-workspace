# Cron Queue System

Hybrid queue + spawn system for reliable cron job execution.

## Problem Solved

Cron jobs fire system events to main session, but if main session is busy with conversation, tasks don't execute.

## Architecture

```
Cron fires → Main session receives event
                    ↓
              Write to queue (pending)
                    ↓
              Spawn sub-agent
                    ↓
         Sub-agent does the work
                    ↓
         Sub-agent updates queue (completed/failed)
                    ↓
         Heartbeat checks for stuck tasks → retry
```

## Queue File

Location: `/root/clawd/cron-queue.json`

```json
{
  "version": 1,
  "tasks": [
    {
      "id": "uuid",
      "cronJob": "job-name",
      "status": "pending|in-progress|completed|failed",
      "taskText": "original task instructions",
      "createdAt": "ISO timestamp",
      "startedAt": null,
      "completedAt": null,
      "sessionKey": "spawned session key",
      "result": "summary of what happened",
      "error": null
    }
  ]
}
```

## Statuses

- `pending`: Task queued, not yet started
- `in-progress`: Sub-agent spawned and working
- `completed`: Task finished successfully
- `failed`: Task errored, will retry on next heartbeat

## Main Session Behavior

When receiving a cron system event:
1. Immediately add to queue with status `pending`
2. Spawn sub-agent with task + queue update instructions
3. Return quickly (don't block on task completion)

## Sub-Agent Behavior

Task text for spawned agents includes:
1. Original cron job instructions
2. Queue file path and task ID
3. Instructions to update queue when done

## Heartbeat Recovery

On every heartbeat:
1. Check queue for `pending` tasks (shouldn't exist if spawn worked)
2. Check for `failed` tasks older than 5 min → retry
3. Check for `in-progress` tasks older than 30 min → mark failed

## Cleanup

Completed tasks older than 24h can be pruned to keep file small.
