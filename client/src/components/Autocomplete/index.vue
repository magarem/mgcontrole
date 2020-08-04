<script>
export default {
  name: 'Autocomplete',

  props: {
    items: {
      type: Array,
      required: false,
      default: () => []
    },
    isAsync: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data() {
    return {
      selected_id: null,
      isOpen: false,
      results: [],
      search: '',
      isLoading: false,
      arrowCounter: 0
    }
  },
  watch: {
    items: function(val, oldValue) {
      // actually compare them
      if (val.length !== oldValue.length) {
        this.results = val
        this.isLoading = false
      }
    }
  },
  mounted() {
    this.setFocus()
    // this.$refs.searchTerm_.focus()
    document.addEventListener('click', this.handleClickOutside)
  },
  destroyed() {
    document.removeEventListener('click', this.handleClickOutside)
  },

  methods: {
    setFocus() {
      this.search = ''
      this.$refs.searchTerm_.focus()
    },
    onChange() {
      // Let's warn the parent that a change was made
      // this.$emit('input', this.search)

      // Is the data given by an outside ajax request?
      if (this.isAsync) {
        this.isLoading = true
      } else {
        // Let's  our flat array
        this.filterResults()
        this.isOpen = true
      }
    },
    filterResults() {
      // first uncapitalize all the things
      this.results = this.items.filter((item) => {
        // console.log('item:', item);
        return item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      }).slice(0, 4)
    },
    setResult(result) {
      this.search = result.name
      this.selected_id = result.id
      this.isOpen = false
      this.arrowCounter = -1
      this.$emit('input', this.selected_id)
      this.search = ''
    },
    onArrowDown(evt) {
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter = this.arrowCounter + 1
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1
      }
    },
    onEnter() {
      this.search = this.results[this.arrowCounter].name
      this.selected_id = this.results[this.arrowCounter].id
      this.isOpen = false
      this.arrowCounter = 0
      this.$emit('input', this.selected_id)
      this.search = ''
      // this.emitToParent()
    },
    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.isOpen = false
        this.arrowCounter = -1
      }
    }
  }
}
</script>

<template>
  <div class="autocomplete">

    <input
      ref="searchTerm_"
      v-model="search"
      type="text"
      style="width: 100%"
      @input="onChange"
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @keydown.enter="onEnter"
    >
    <ul
      v-show="isOpen"
      id="autocomplete-results"
      class="autocomplete-results"
    >
      <li
        v-if="isLoading"
        class="loading">
        Loading results...
      </li>
      <li
        v-for="(result, i) in results"
        v-else
        :key="i"
        class="autocomplete-result"
        :class="{ 'is-active': i === arrowCounter }"
        @click="setResult(result)">
        {{ result.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
  div.ex1 {
      background-color: lightblue;
      width: 110px;
      height: 110px;
      overflow: auto;
  }

  .autocomplete {
    position: relative;
  }

  .autocomplete-results {
    padding: 0;
    margin: 0;
    border: 1px solid #eeeeee;
    height: 145px;
    overflow: auto;
    width: 100%;
  }

  .autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 4px 2px;
    cursor: pointer;
  }

  .autocomplete-result.is-active,
  .autocomplete-result:hover {
    background-color: #4AAE9B;
    color: white;
  }

</style>
