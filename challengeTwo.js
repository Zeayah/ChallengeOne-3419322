class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
    this.products = [];
  }
}

class SearchSuggestionSystem {
  constructor(products) {
    this.root = new TrieNode();

    products.sort();

    for (const product of products) {
      this.insert(product);
    }
  }

  insert(product) {
    let node = this.root;

    for (const char of product) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];

      if (node.products.length < 3) {
        node.products.push(product);
      }
    }
    node.isEndOfWord = true;
  }

  getSuggestions(searchWord) {
    const result = [];
    let node = this.root;
    let prefixFound = true;

    for (let i = 0; i < searchWord.length; i++) {
      const char = searchWord[i];

      if (prefixFound && node.children[char]) {
        node = node.children[char];
        result.push([...node.products]);
      } else {
        prefixFound = false;
        result.push([]);
      }
    }

    return result;
  }
}

const products = [
    "mobile",
    "mouse",
    "moneypot",
    "monitor",
    "mousepad",
    "samsung galaxy s21",
    "samsung galaxy s20",
    "samsung galaxy s10",
    "samsung galaxy s9",
    "samsung galaxy s8"
];
const system = new SearchSuggestionSystem(products);
const result = system.getSuggestions("samsung");
console.log(JSON.stringify(result, null, 2));
