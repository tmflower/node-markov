/** Textual markov chain generator */

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  makeChains() {
    const words = new Map();

    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i]; 
      let nextWord = this.words[i + 1]
      if (i === this.words.length-1) {
        words.set(word, [null])
      }
      else if (words.has(word)) {
        words.get(word).push(nextWord);
      }
      else {
        words.set(word, [nextWord]);
      }          
    }
    this.words = words;
  }

  /** return random text from chains */

  makeText(numWords = 50) {
    let newText = [];

    for (let i = 0; i < numWords; i++) {
      let keys = [...this.words.keys()];
      let numKey = Math.floor(Math.random() * keys.length);
      let word = keys[numKey];
      newText.push(word);
  
      let vals = this.words.get(word)
      let numVal = Math.floor(Math.random() * vals.length);
      let nextWord = vals[numVal];
      newText.push(nextWord);
    }
    return newText.join(" ")
  }
}

module.exports = {
  MarkovMachine,
};

// let mm = new MarkovMachine("Do you like Green eggs and ham I do not like them, Sam-I-am. I do not like Green eggs and ham. Would you like them Here or there? I do not like them in a house. Not in a box. Not with a fox. Not in a house. Not with a mouse. I would not eat them here or there. I would not eat them anywhere.");

// let mm = new MarkovMachine("Coffee is a brewed drink prepared from roasted coffee beans, the seeds of berries from certain flowering plants in the Coffea genus. From the coffee fruit, the seeds are separated to produce a stable, raw product: unroasted green coffee. The seeds are then roasted, a process which transforms them into a consumable product: roasted coffee, which is ground into fine particles that are typically steeped in hot water before being filtered out, producing a cup of coffee. Coffee is darkly colored, bitter, slightly acidic and has a stimulating effect in humans, primarily due to its caffeine content.[3] It is one of the most popular drinks in the world[4] and can be prepared and presented in a variety of ways (e.g., espresso, French press, caffè latte, or already-brewed canned coffee). It is usually served hot, although chilled or iced coffee is common. Sugar, sugar substitutes, milk or cream are often used to lessen the bitter taste or enhance the flavor. It may be served with coffee cake or another sweet dessert, like doughnuts. A commercial establishment that sells prepared coffee beverages is known as a coffeehouse or coffee shop (not to be confused with Dutch coffeeshops selling cannabis). Clinical research indicates that moderate coffee consumption is benign or mildly beneficial as a stimulant in healthy adults, with continuing research on whether long-term consumption has positive or negative effects.[5]")

// console.log(mm.makeText());


