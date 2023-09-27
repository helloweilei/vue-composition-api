<template>
  <codemirror v-model="code" placeholder="Code goes here..." :style="{ height: '400px' }" :autofocus="true"
    :indent-with-tab="true" :tab-size="2" :extensions="extensions" @ready="handleReady" @change="log('change', $event)"
    @focus="log('focus', $event)" @blur="log('blur', $event)" />
</template>

<script lang="js">
import { defineComponent, ref, shallowRef } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { syntaxTree } from "@codemirror/language"
import { javascriptLanguage } from "@codemirror/lang-javascript"


export default defineComponent({
  components: {
    Codemirror
  },
  setup() {
    const code = ref(`console.log('Hello, world!')`)

    // Codemirror EditorView instance ref
    const view = shallowRef()
    const handleReady = (payload) => {
      view.value = payload.view
    }

    // Status is available at all times via Codemirror EditorView
    const getCodemirrorStates = () => {
      const state = view.value.state
      const ranges = state.selection.ranges
      const selected = ranges.reduce((r, range) => r + range.to - range.from, 0)
      const cursor = ranges[0].anchor
      const length = state.doc.length
      const lines = state.doc.lines
      // more state info ...
      // return ...
    }


    const tagOptions = [
      "constructor", "deprecated", "link", "param", "returns", "type"
    ].map(tag => ({ label: "@" + tag, type: "keyword" }))

    function completeJSDoc(context) {
      let nodeBefore = syntaxTree(context.state).resolveInner(context.pos, -1)
      if (nodeBefore.name != "BlockComment" ||
        context.state.sliceDoc(nodeBefore.from, nodeBefore.from + 3) != "/**")
        return null
      let textBefore = context.state.sliceDoc(nodeBefore.from, context.pos)
      let tagBefore = /@\w*$/.exec(textBefore)
      if (!tagBefore && !context.explicit) return null
      return {
        from: tagBefore ? nodeBefore.from + tagBefore.index : context.pos,
        options: tagOptions,
        validFor: /^(@\w*)?$/
      }
    }

    function myCompletions(context) {
      let word = context.matchBefore(/\w*/)
      if (word.from == word.to && !context.explicit)
        return null
      return {
        from: word.from,
        options: [
          { label: "match", type: "keyword" },
          { label: "hello", type: "variable", info: "(World)" },
          { label: "magic", type: "text", apply: "⠁⭒*.✩.*⭒⠁", detail: "macro" }
        ],
      }
    }

    const jsDocCompletions = javascriptLanguage.data.of({
      autocomplete: myCompletions
    })

    const extensions = [javascript(), oneDark, jsDocCompletions]

    return {
      code,
      extensions,
      handleReady,
      log: console.log
    }
  }
})
</script>