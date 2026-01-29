# Component Reusability Standards Update

**Date:** 2026-01-29
**Task:** Add component reusability rules to code standards documentation
**Status:** Completed

## Summary

Updated `d:\BDS\tongkho-web\docs\code-standards.md` with comprehensive component reusability guidelines following the DRY principle.

## Changes Made

### New Section: "Component Reusability (DRY Principle)"
Added after React Component Patterns section with the following subsections:

#### 1. Before Creating New Components
- Discovery checklist with verification steps
- Search existing components before implementation
- Analyze structure compatibility
- Consider parameterization approaches

#### 2. Example: SidebarFilterList Pattern
- Real-world example demonstrating the issue
- ❌ Bad approach: separate `PriceFilter` and `AreaFilter` components
- ✅ Good approach: single `SidebarFilterList` with props
- Shows concrete usage patterns

#### 3. Refactoring Duplicate Components
- 4-step refactoring process:
  1. Identify similarities
  2. Extract common props interface
  3. Create single reusable component with generics
  4. Delete old components and verify usages
- Comparison table format for clarity

#### 4. Variant Props vs Multiple Components
- Decision matrix: when to use variant props vs separate components
- Code example showing `variant` and `size` props pattern
- Clear criteria for each approach

#### 5. Composition Over Duplication
- Pattern demonstrating composition of reusable components
- ✓ Good composition example
- ✗ Bad duplication example

#### 6. Component Checklist Before Implementation
- Pre-implementation validation checklist
- 8 checkpoints for developers

## Metrics

| Metric | Value |
|--------|-------|
| Original file size | 449 LOC |
| Updated file size | 663 LOC |
| Lines added | 214 |
| New section added | 1 |
| Subsections | 6 |
| Code examples | 8 |
| Checklists | 1 |

## Design Decisions

1. **Placement**: Added after React Component Patterns section for logical flow (patterns → reusability → data structures)

2. **Structure**: Progressive disclosure from checking existing components → identifying duplicates → refactoring → decision criteria → validation

3. **Examples**: Used `SidebarFilterList` pattern as requested, showing real-world application in the codebase context

4. **Generics**: Demonstrated TypeScript generics for maximum reusability (`FilterList<T>`)

5. **Format**: Consistent with existing documentation style - tables, code blocks, good/bad patterns

## Key Rules Added

1. **Always check existing components before creating new ones**
2. **Use variant props for styling differences, separate components for structural differences**
3. **Compose smaller components rather than duplicate logic**
4. **Extract common props interfaces for reusable patterns**
5. **Delete duplicate components after refactoring**

## File Compliance

- ✓ File under 800 LOC limit (663 lines)
- ✓ Follows existing formatting standards
- ✓ Consistent with code standards document style
- ✓ Includes practical examples from codebase context
- ✓ Progressive complexity from basic to advanced patterns

## Next Steps

- Review component structure in `src/components/` for existing duplicates
- Apply reusability standards to upcoming component implementations
- Use component checklist during code reviews
- Consider extracting existing filter-like components into reusable patterns
