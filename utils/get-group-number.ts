import { minimatch } from 'minimatch'

import type { SortingNode } from '../typings'

let vueGroups: Record<string, string> = {
  'CONDITIONALS': 'v-*(else-if|if|else|show|cloak)',
  'TWO_WAY_BINDING': '*(v-model|v-model:*)',
  'RENDER_MODIFIERS': 'v-*(pre|once)',
  'UNIQUE': '@(ref|key|:ref|:key)',
  'SLOT': '*(v-slot|slot|:slot)',
  'CONTENT': 'v-*(html|text)',
  'LIST_RENDERING': 'v-for',
  'OTHER_DIRECTIVES': 'v-*',
  'EVENTS': '*(v-on|@*)',
  'GLOBAL': '*(id|:id)',
  'ATTR_DYNAMIC': ':*',
  'DEFINITION': ':is',
}

export let getGroupNumber = (
  groups: (string[] | string)[] | 'recommended',
  node: SortingNode,
): number => {
  if(groups === 'recommended') {
    return Object.values(vueGroups).findIndex((value) => minimatch(node.name, value))
  }

  for (let i = 0, max = groups.length; i < max; i++) {
    let currentGroup = groups[i]

    if (
      node.group === currentGroup ||
      (Array.isArray(currentGroup) &&
        typeof node.group === 'string' &&
        currentGroup.includes(node.group))
    ) {
      return i
    }
  }

  return groups.length
}
