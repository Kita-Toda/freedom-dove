# Swarm Launch Plan — Components Publishing Workflow

**Status:** 🚀 READY TO LAUNCH  
**Workflow:** `publish_to_21st`  
**Components:** StatCard, ActionCard, StoryCard  
**Target:** 21st dev team registry  
**Date Started:** 2026-07-14  

---

## Pre-Launch Checklist

- [x] Components extracted and tested
- [x] Demo files created for all 3 components
- [x] Documentation written (README.md + inline comments)
- [x] Git commits made with clear messages
- [x] Swarm configuration defined (.claude/swarm.yaml)
- [x] Swarm usage guide created (.claude/SWARM.md)
- [ ] 21st dev authentication completed
- [ ] Swarm workflow launched
- [ ] Components published to registry
- [ ] Team notified of new components

---

## Step-by-Step Execution

### STEP 1: Authenticate with 21st dev (You do this)

Run in your terminal:

```bash
npx @21st-dev/registry login
```

This will:
1. Prompt for your 21st dev API key
2. Save credentials locally (~/.21st/credentials)
3. Enable `registry publish` commands

**Status:** ⏳ Waiting for user authentication

---

### STEP 2: Verify Component Files

```bash
# Check all files are in place
ls -la src/components/ui/

# Expected output:
# ActionCard.demo.tsx
# ActionCard.tsx
# README.md
# StatCard.demo.tsx
# StatCard.tsx
# StoryCard.demo.tsx
# StoryCard.tsx
```

**Status:** ✅ Verified

---

### STEP 3: Install Ruflo Swarm Plugin (You do this)

In Claude Code, run:

```bash
/plugin marketplace add ruvnet/ruflo
/plugin install ruflo-swarm@ruflo
```

Alternatively, if direct installation fails, manually verify:

```bash
# Check if ruflo-swarm is available
npx ruflo-swarm --version
```

**Status:** ⏳ Waiting for plugin installation

---

### STEP 4: Launch Swarm Workflow

Once authenticated, choose one of these approaches:

#### Option A: Using Ruflo Swarm CLI (Recommended)

```bash
# List available workflows
npx ruflo-swarm list

# Start the publish workflow
npx ruflo-swarm start publish_to_21st
```

#### Option B: Manual Multi-Step Publishing

If swarm plugin isn't available yet, publish components individually:

```bash
# Publish StatCard
npx @21st-dev/registry publish ./src/components/ui/StatCard.tsx \
  --description "Metric card displaying large numbers with labels. Perfect for impact dashboards and stats displays." \
  --tags "card,metrics,stats,impact" \
  --demo ./src/components/ui/StatCard.demo.tsx

# Publish ActionCard
npx @21st-dev/registry publish ./src/components/ui/ActionCard.tsx \
  --description "Multi-action option card with emoji, description, features list, and CTA button. Ideal for service offerings." \
  --tags "card,action,cta,service" \
  --demo ./src/components/ui/ActionCard.demo.tsx

# Publish StoryCard
npx @21st-dev/registry publish ./src/components/ui/StoryCard.tsx \
  --description "Narrative card for stories, testimonials, and case studies with title, description, and region badge." \
  --tags "card,story,narrative,testimonial" \
  --demo ./src/components/ui/StoryCard.demo.tsx
```

**Status:** ⏳ Waiting for workflow launch

---

## Expected Outputs

### After Publishing Successfully

✅ **StatCard** published to:
```
https://21st.dev/community/components/{username}/stat-card
```

✅ **ActionCard** published to:
```
https://21st.dev/community/components/{username}/action-card
```

✅ **StoryCard** published to:
```
https://21st.dev/community/components/{username}/story-card
```

### Installation Command (for team)

```bash
npx @21st-dev/registry add @yourteam/stat-card
npx @21st-dev/registry add @yourteam/action-card
npx @21st-dev/registry add @yourteam/story-card
```

---

## Workflow Tasks Breakdown

### Designer Agent
- [ ] Review component design and styling consistency
- [ ] Create annotated screenshots of demo variants
- [ ] Prepare preview images for registry
- **Deliverable:** Component previews + design validation

### Developer Agent
- [ ] Verify component code quality and TypeScript types
- [ ] Ensure proper exports and dependencies
- [ ] Test component functionality
- **Deliverable:** Production-ready component files

### Content Agent
- [ ] Write component descriptions (10-20 words)
- [ ] Create usage examples for README
- [ ] Write installation instructions
- **Deliverable:** Documentation + descriptions

### Tester Agent
- [ ] Test all 3 components in browser
- [ ] Verify demos render correctly
- [ ] Check accessibility (WCAG AA)
- [ ] Test responsive layouts
- **Deliverable:** Test report + verification

### Coordinator Agent
- [ ] Manage workflow execution
- [ ] Handle 21st dev authentication
- [ ] Trigger publishing commands
- [ ] Collect results and report status
- **Deliverable:** Published components + registry links

---

## Success Criteria

Workflow is complete when:

- [x] All 3 components have working TypeScript exports
- [x] Demo files showcase all color variants
- [x] README.md documents all props and usage
- [ ] Components published to 21st dev registry
- [ ] Team can install with `@21st-dev/registry add`
- [ ] Component pages have live previews
- [ ] Documentation is clear and complete

---

## Rollback Plan

If publishing fails:

```bash
# Check for authentication issues
npx @21st-dev/registry team list

# If needed, re-authenticate
npx @21st-dev/registry logout
npx @21st-dev/registry login

# Verify component file integrity
npm run type-check

# Try publishing again with verbose output
npx @21st-dev/registry publish ./src/components/ui/StatCard.tsx \
  --verbose \
  --description "..."
```

---

## Post-Launch Cleanup

After successful publishing:

```bash
# Commit publishing success
git add -A
git commit -m "chore: components published to 21st dev registry

- StatCard: https://21st.dev/community/components/{username}/stat-card
- ActionCard: https://21st.dev/community/components/{username}/action-card
- StoryCard: https://21st.dev/community/components/{username}/story-card

Available for team installation via:
npx @21st-dev/registry add @yourteam/[component-slug]"

# Tag the release
git tag -a v1.0.0-components -m "Components published to 21st dev registry"

# Push to remote
git push origin main
git push origin v1.0.0-components
```

---

## Next Workflows (After This One)

Once component publishing is complete, consider these workflows:

1. **`content_refresh`** — Add SEO metadata (meta tags, OG images)
2. **`accessibility_audit`** — Full WCAG AA compliance check
3. **`new_feature`** — Add email capture form
4. **`component_improvement`** — Optimize mobile performance

---

## Timeline

| Phase | Task | Duration | Status |
|-------|------|----------|--------|
| **Setup** | Install plugins, authenticate | 5 min | ⏳ Pending |
| **Publish** | Publish 3 components | 10 min | ⏳ Pending |
| **Verify** | Check registry, test installation | 5 min | ⏳ Pending |
| **Document** | Update project docs with registry links | 5 min | ⏳ Pending |
| **Total** | **Complete workflow** | **25 min** | ⏳ Pending |

---

## Questions & Support

**Need help?**
- Check `.claude/SWARM.md` for detailed workflow guide
- Review `src/components/ui/README.md` for component details
- See swarm.yaml for configuration reference

**Ready?** Proceed with Step 1 (Authentication) above! 🚀

---

*Generated: 2026-07-14*  
*Workflow: publish_to_21st*  
*Components: StatCard, ActionCard, StoryCard*
