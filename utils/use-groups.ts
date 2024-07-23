import { minimatch } from 'minimatch'

export let useGroups = (groups: (string[] | string)[] | string) => {
  let group: undefined | string

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

  let defineGroup = (value: string, override = false) => {
    if(typeof groups === 'string') {
      if(vueGroups[value]) {
        group = vueGroups[value]
      }
    }
    else if ((!group || override) && groups.flat().includes(value)) {
      group = value
    }
  }

  let setCustomGroups = (
    customGroups:
      | {
          [key: string]: string[] | string
        }
      | undefined,
    name: string,
    params: { override?: boolean } = {},
  ) => {
    if (customGroups) {
      for (let [key, pattern] of Object.entries(customGroups)) {
        if (
          Array.isArray(pattern) &&
          pattern.some(patternValue =>
            minimatch(name, patternValue, {
              nocomment: true,
            }),
          )
        ) {
          defineGroup(key, params.override)
        }

        if (
          typeof pattern === 'string' &&
          minimatch(name, pattern, {
            nocomment: true,
          })
        ) {
          defineGroup(key, params.override)
        }
      }
    }
  }

  let defineVueGroups = () => {
    Object.entries(vueGroups).forEach(([, value]) => {
      setCustomGroups(vueGroups, value, { override: true })
    })
  }

  return {
    getGroup: () => group ?? 'unknown',
    setCustomGroups,
    defineVueGroups,
    defineGroup,
  }
}
