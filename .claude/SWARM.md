# Ruflo Swarm Guide — Freedom/Unchained Project

This guide explains how to use ruflo-swarm for coordinated multi-agent development on the Freedom project.

## What is Ruflo Swarm?

Ruflo-swarm enables multiple specialized agents to work together on complex tasks:
- **Hierarchical coordination** — one agent orchestrates, others specialize
- **Parallel execution** — independent tasks run simultaneously
- **Task tracking** — progress visible across the team
- **Isolation** — each agent works in its own worktree, preventing conflicts

## Swarm Roles on This Project

| Role | Responsibilities | Specialization |
|------|------------------|-----------------|
| **Coordinator** | Plans, delegates, tracks progress | Task orchestration |
| **Designer** | UI components, design system, 21st dev | Visual + component libraries |
| **Developer** | Feature implementation, integration | Code + architecture |
| **Tester** | Verification, accessibility, performance | QA + user experience |
| **Content** | Messaging, storytelling, documentation | Writing + SEO |

## Common Workflows

### 1. Publish Components to 21st dev

**Workflow:** `publish_to_21st`

```bash
# Coordinator launches the swarm
/ruflo-swarm start publish_to_21st

# Tasks assigned:
# - Designer: Prepares demos and component previews
# - Developer: Ensures code quality and exports
# - Content: Writes documentation and usage guides
# - Coordinator: Handles registry authentication and publishing
```

**Output:**
- Published components with live demos
- Complete documentation
- 21st dev registry links

### 2. Improve SEO & Metadata

**Workflow:** `content_refresh`

```bash
# Content agent refreshes messaging
/ruflo-swarm start content_refresh

# Tasks:
# - Content: Review all copy, add OG images, meta descriptions
# - Developer: Implement meta tags in Layout.astro
# - Tester: Verify with og:image preview tools
# - Designer: Ensure visual consistency
```

### 3. Accessibility Audit

**Workflow:** `accessibility_audit`

```bash
# Full WCAG AA compliance check
/ruflo-swarm start accessibility_audit

# Tasks (sequential):
# 1. Tester: Run automated WCAG/axe checks → report issues
# 2. Designer: Review color contrast, spacing, focus states
# 3. Developer: Fix HTML semantics, ARIA, keyboard navigation
# 4. Tester: Verify with screen reader + manual testing
```

### 4. New Feature Development

**Workflow:** `new_feature`

```bash
# Example: Add newsletter signup form
/ruflo-swarm start new_feature

# Parallel tasks:
# - Designer & Developer: Work simultaneously on design + code
# Tasks then run in sequence:
# - Tester: Verify functionality and accessibility
# - Content: Optimize messaging and CTA copy
```

## Using Ruflo Swarm

### Installation

```bash
/plugin marketplace add ruvnet/ruflo
/plugin install ruflo-swarm@ruflo
```

### Starting a Workflow

```bash
# List available workflows
/ruflo-swarm list

# Start a specific workflow
/ruflo-swarm start <workflow-name>

# Example: publish components
/ruflo-swarm start publish_to_21st

# Monitor progress
/ruflo-swarm status
```

### Adding a New Task

```bash
# Create a task and assign it to agents
/ruflo-swarm task create \
  --name "Add email capture form" \
  --workflow new_feature \
  --assign designer,developer,tester \
  --priority high
```

### Viewing Progress

```bash
# See all active tasks
/ruflo-swarm dashboard

# View a specific agent's work
/ruflo-swarm agent designer

# Check task details
/ruflo-swarm task <task-id>
```

### Completing a Task

```bash
# Mark task as done (with notes)
/ruflo-swarm task complete <task-id> \
  --notes "Component tested and ready for production"

# Review task output
/ruflo-swarm task show <task-id>
```

## Parallel vs Sequential Execution

### Parallel Tasks

These run **simultaneously** (faster):
- Designer creates component design
- Developer implements component
→ Both work independently, merge results

### Sequential Tasks

These run **one at a time** (dependent):
1. Developer implements feature
2. Tester verifies functionality
3. Content refines messaging

## Worktrees & Isolation

Each agent gets its own **git worktree**, preventing merge conflicts:

```bash
# Coordinator creates worktrees
/ruflo-swarm start <workflow>

# Agent-specific branches:
# main
# └── feature/components-publish (designer)
# └── feature/components-publish (developer)
# └── feature/components-publish (tester)
# └── feature/components-publish (content)

# After each agent completes, coordinator merges back to main
```

## Current Active Tasks

From `.claude/swarm.yaml`:

| ID | Task | Workflow | Status | Assigned To |
|---|------|----------|--------|-------------|
| `components-publish` | Publish 3 components to 21st dev | publish_to_21st | In Progress | designer, developer, content |
| `improve-seo` | Add meta tags, OG images, SEO | content_refresh | Backlog | content |
| `add-email-capture` | Newsletter/contact form | new_feature | Backlog | developer, designer |
| `accessibility-audit` | Full WCAG AA audit | accessibility_audit | Backlog | tester, developer, designer |
| `mobile-optimization` | Optimize for mobile devices | component_improvement | Backlog | designer, developer, tester |

## Best Practices

### 1. Define Clear Requirements
Before starting a workflow, document:
- What's being built
- Why it matters
- Acceptance criteria

### 2. Use Worktrees
Always use worktree isolation:
```bash
/ruflo-swarm start <workflow>  # Creates worktrees automatically
```

### 3. Communicate Blockers
If an agent gets stuck:
```bash
/ruflo-swarm block <task-id> \
  --reason "Waiting for component API design from designer" \
  --notify coordinator
```

### 4. Review Before Merging
Coordinator reviews each agent's work before merging to main:
```bash
/ruflo-swarm merge review <task-id>
```

### 5. Document Decisions
Commit messages should explain *why*, not just what:
```bash
git commit -m "feat: add StatCard component

- Extracted from impact dashboard for reusability
- Supports 4 color themes (gold, mauve, gold-light, cream)
- Includes hover glow effect for premium feel
- Ready for 21st dev registry

Workflow: publish_to_21st
Task: components-publish"
```

## Integration with Other Plugins

### With ruflo-testgen
Tester agent can auto-generate tests:
```bash
# Tester runs after Developer
/ruflo-swarm workflow add-task new_feature \
  --after developer \
  --agent tester \
  --command "ruflo-testgen --target src/"
```

### With ruflo-browser
Tester can automate verification:
```bash
# Visual regression testing
browse snapshot           # baseline
browse goto /page        # navigate
browse screenshot -D     # diff vs baseline
```

### With ruflo-security-audit
Before publishing:
```bash
# Security agent checks code
/ruflo-swarm security-audit components/
# Scans for secrets, vulnerabilities, PII
```

## Troubleshooting

### Agent Not Responding
```bash
/ruflo-swarm restart <agent>
```

### Task Stuck
```bash
# Pause and investigate
/ruflo-swarm task pause <task-id>

# Check agent status
/ruflo-swarm status

# Resume when ready
/ruflo-swarm task resume <task-id>
```

### Merge Conflict
```bash
# Coordinator handles merge conflicts
/ruflo-swarm merge resolve <task-id>
```

### Cancel Workflow
```bash
/ruflo-swarm cancel <workflow-id>
```

## Success Criteria

The Freedom project swarm is successful when:

✅ Components published to 21st dev with full documentation  
✅ No console errors or accessibility violations  
✅ All internal links working  
✅ Page load time < 3s (Lighthouse 95+)  
✅ Mobile/tablet/desktop responsive layouts verified  
✅ SEO metadata complete (meta tags, OG images)  
✅ Email capture form functional  
✅ WCAG AA compliance audit passed  

## Next Steps

1. **Install ruflo-swarm**
   ```bash
   /plugin marketplace add ruvnet/ruflo
   /plugin install ruflo-swarm@ruflo
   ```

2. **Review swarm configuration**
   ```bash
   cat .claude/swarm.yaml
   ```

3. **Start component publishing workflow**
   ```bash
   /ruflo-swarm start publish_to_21st
   ```

4. **Monitor progress**
   ```bash
   /ruflo-swarm dashboard
   ```

5. **Review merged results**
   ```bash
   git log --oneline -10
   ```

---

For questions or improvements, update `.claude/swarm.yaml` and this guide accordingly.
