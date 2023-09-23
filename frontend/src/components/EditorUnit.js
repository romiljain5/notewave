import axios from "axios";

export const emojiOptions = [
        { emoji: "😀", key: "Grinning Face" },
        { emoji: "😃", key: "Grinning Face with Big Eyes" },
        { emoji: "😄", key: "Grinning Face with Smiling Eyes" },
        { emoji: "😁", key: "Beaming Face with Smiling Eyes" },
        { emoji: "😆", key: "Grinning Squinting Face" },
        { emoji: "😅", key: "Grinning Face with Sweat" },
        { emoji: "😂", key: "Face with Tears of Joy" },
        { emoji: "🤣", key: "Rolling on the Floor Laughing" },
        { emoji: "😊", key: "Smiling Face with Smiling Eyes" },
        { emoji: "😇", key: "Smiling Face with Halo" },
        { emoji: "🙂", key: "Slightly Smiling Face" },
        { emoji: "🙃", key: "Upside-Down Face" },
        { emoji: "😉", key: "Winking Face" },
        { emoji: "😌", key: "Relieved Face" },
        { emoji: "😍", key: "Heart Eyes" },
        { emoji: "🥰", key: "Smiling Face with Hearts" },
        { emoji: "😘", key: "Face Blowing a Kiss" },
        { emoji: "😗", key: "Kissing Face" },
        { emoji: "😙", key: "Kissing Face with Smiling Eyes" },
        { emoji: "😚", key: "Kissing Face with Closed Eyes" },
        { emoji: "😋", key: "Face Savoring Food" },
        { emoji: "😛", key: "Face with Tongue" },
        { emoji: "😜", key: "Winking Face with Tongue" },
        { emoji: "😝", key: "Squinting Face with Tongue" },
        { emoji: "🤑", key: "Money-Mouth Face" },
        { emoji: "🤓", key: "Nerd Face" },
        { emoji: "😎", key: "Smiling Face with Sunglasses" },
        { emoji: "🤩", key: "Star-Struck" },
        { emoji: "🥳", key: "Partying Face" },
        { emoji: "😏", key: "Smirking Face" },
        { emoji: "😒", key: "Unamused Face" },
        { emoji: "😞", key: "Disappointed Face" },
        { emoji: "😔", key: "Pensive Face" },
        { emoji: "😟", key: "Worried Face" },
        { emoji: "😕", key: "Confused Face" },
        { emoji: "🙁", key: "Slightly Frowning Face" },
        { emoji: "☹️", key: "Frowning Face" },
        { emoji: "😣", key: "Persevering Face" },
        { emoji: "😖", key: "Confounded Face" },
        { emoji: "😫", key: "Tired Face" },
        { emoji: "😩", key: "Weary Face" },
        { emoji: "🥺", key: "Pleading Face" },
        { emoji: "😢", key: "Crying Face" },
        { emoji: "😭", key: "Loudly Crying Face" },
        { emoji: "😤", key: "Face with Steam From Nose" },
        { emoji: "😠", key: "Angry Face" },
        { emoji: "😡", key: "Pouting Face" },
        { emoji: "🤬", key: "Face with Symbols on Mouth" },
        { emoji: "🤯", key: "Exploding Head" },
        { emoji: "😳", key: "Flushed Face" },
        { emoji: "🥴", key: "Woozy Face" },
        { emoji: "😱", key: "Face Screaming in Fear" },
        { emoji: "😨", key: "Fearful Face" },
        { emoji: "😰", key: "Anxious Face with Sweat" },
        { emoji: "😥", key: "Sad but Relieved Face" },
        { emoji: "😓", key: "Face with Cold Sweat" },
        { emoji: "🤗", key: "Hugging Face" },
        { emoji: "🤔", key: "Thinking Face" },
        { emoji: "🤭", key: "Face with Hand Over Mouth" },
        { emoji: "🤫", key: "Shushing Face" },
        { emoji: "🤥", key: "Lying Face" },
        { emoji: "😶‍🌫️", key: "Face in Clouds" },
        { emoji: "😶", key: "Face Without Mouth" },
        { emoji: "😐", key: "Neutral Face" },
        { emoji: "😑", key: "Expressionless Face" },
        { emoji: "😬", key: "Grimacing Face" },
        { emoji: "🙄", key: "Face with Rolling Eyes" },
        { emoji: "😯", key: "Hushed Face" },
        { emoji: "😦", key: "Frowning Face with Open Mouth" },
        { emoji: "😧", key: "Anguished Face" },
        { emoji: "😮", key: "Face with Open Mouth" },
        { emoji: "😲", key: "Astonished Face" },
        { emoji: "🥱", key: "Yawning Face" },
        { emoji: "😴", key: "Sleeping Face" },
        { emoji: "🤤", key: "Drooling Face" },
        { emoji: "😪", key: "Sleepy Face" },
        { emoji: "😵", key: "Dizzy Face" },
        { emoji: "🤐", key: "Zipper-Mouth Face" },
        { emoji: "🥴", key: "Woozy Face" },
        { emoji: "🤢", key: "Nauseated Face" },
        { emoji: "🤮", key: "Face Vomiting" },
        { emoji: "🤧", key: "Sneezing Face" },
        { emoji: "😷", key: "Face with Medical Mask" },
        { emoji: "🤒", key: "Face with Thermometer" },
        { emoji: "🤕", key: "Face with Head-Bandage" },
        { emoji: "🤑", key: "Money-Mouth Face" },
        { emoji: "🤠", key: "Cowboy Hat Face" },
        { emoji: "😈", key: "Smiling Face with Horns" },
        { emoji: "👿", key: "Angry Face with Horns" },
        { emoji: "👹", key: "Ogre" },
        { emoji: "👺", key: "Goblin" },
        { emoji: "💀", key: "Skull" },
        { emoji: "👻", key: "Ghost" },
        { emoji: "👽", key: "Alien" },
        { emoji: "🛸", key: "Flying Saucer" },
        { emoji: "🪐", key: "Ringed Planet" },
        { emoji: "💩", key: "Pile of Poo" },
        { emoji: "🤡", key: "Clown Face" },
        { emoji: "👹", key: "Ogre" },
        { emoji: "👺", key: "Goblin" },
        { emoji: "💀", key: "Skull" },
        { emoji: "👻", key: "Ghost" },
        { emoji: "👽", key: "Alien" },
        { emoji: "🛸", key: "Flying Saucer" },
        { emoji: "🪐", key: "Ringed Planet" },
        { emoji: "💩", key: "Pile of Poo" },
        { emoji: "🤡", key: "Clown Face" },
        { emoji: "👾", key: "Alien Monster" },
        { emoji: "🤖", key: "Robot Face" },
        { emoji: "😺", key: "Grinning Cat Face" },
        { emoji: "😸", key: "Grinning Cat Face with Smiling Eyes" },
        { emoji: "😹", key: "Cat Face with Tears of Joy" },
        { emoji: "😻", key: "Smiling Cat Face with Heart-Eyes" },
        { emoji: "😼", key: "Cat Face with Wry Smile" },
        { emoji: "😽", key: "Kissing Cat Face" },
        { emoji: "🙀", key: "Weary Cat Face" },
        { emoji: "😿", key: "Crying Cat Face" },
        { emoji: "😾", key: "Pouting Cat Face" },
        { emoji: "🦁", key: "Lion Face" },
        { emoji: "🐱", key: "Cat Face" },
        { emoji: "🐈", key: "Cat" },
        { emoji: "🐯", key: "Tiger Face" },
        { emoji: "🐅", key: "Tiger" },
        { emoji: "🐆", key: "Leopard" },
        { emoji: "🐴", key: "Horse Face" },
        { emoji: "🐎", key: "Horse" },
        { emoji: "🦄", key: "Unicorn Face" },
        { emoji: "🦓", key: "Zebra" },
        { emoji: "🦌", key: "Deer" },
        { emoji: "🐮", key: "Cow Face" },
        { emoji: "🐂", key: "Ox" },
        { emoji: "🐃", key: "Water Buffalo" },
        { emoji: "🐄", key: "Cow" },
        { emoji: "🐷", key: "Pig Face" },
        { emoji: "🐖", key: "Pig" },
        { emoji: "🐗", key: "Boar" },
        { emoji: "🐽", key: "Pig Nose" },
        { emoji: "🐏", key: "Ram" },
        { emoji: "🐑", key: "Ewe" },
        { emoji: "🐐", key: "Goat" },
        { emoji: "🐪", key: "Camel" },
        { emoji: "🐫", key: "Two-Hump Camel" },
        { emoji: "🦙", key: "Llama" },
        { emoji: "🦒", key: "Giraffe" },
        { emoji: "🐘", key: "Elephant" },
        { emoji: "🦏", key: "Rhinoceros" },
        { emoji: "🦛", key: "Hippopotamus" },
        { emoji: "🐭", key: "Mouse Face" },
        { emoji: "🐁", key: "Mouse" },
        { emoji: "🐀", key: "Rat" },
        { emoji: "🐹", key: "Hamster Face" },
        { emoji: "🐰", key: "Rabbit Face" },
        { emoji: "🐇", key: "Rabbit" },
        { emoji: "🐿️", key: "Chipmunk" },
        { emoji: "🦔", key: "Hedgehog" },
        { emoji: "🦇", key: "Bat" },
        { emoji: "🐻", key: "Bear Face" },
        { emoji: "🐨", key: "Koala" },
        { emoji: "🐼", key: "Panda Face" },
        { emoji: "🦥", key: "Sloth" },
        { emoji: "🦦", key: "Otter" },
        { emoji: "🦨", key: "Skunk" },
        { emoji: "🦘", key: "Kangaroo" },
        { emoji: "🦡", key: "Badger" },
        { emoji: "🐾", key: "Paw Prints" },
        { emoji: "🦃", key: "Turkey" },
        { emoji: "🐔", key: "Chicken" },
        { emoji: "🐓", key: "Rooster" },
        { emoji: "🐣", key: "Hatching Chick" },
        { emoji: "🐤", key: "Baby Chick" },
        { emoji: "🐥", key: "Front-Facing Baby Chick" },
        { emoji: "🐦", key: "Bird" },
        { emoji: "🐧", key: "Penguin" },
        { emoji: "🕊️", key: "Dove" },
        { emoji: "🦅", key: "Eagle" },
        { emoji: "🦆", key: "Duck" },
        { emoji: "🦢", key: "Swan" },
        { emoji: "🦉", key: "Owl" },
        { emoji: "🦚", key: "Peacock" },
        { emoji: "🦜", key: "Parrot" },
        { emoji: "🐸", key: "Frog" },
        { emoji: "🐊", key: "Crocodile" },
        { emoji: "🐢", key: "Turtle" },
        { emoji: "🦎", key: "Lizard" },
        { emoji: "🐍", key: "Snake" },
        { emoji: "🐲", key: "Dragon Face" },
        { emoji: "🐉", key: "Dragon" },
        { emoji: "🦕", key: "Sauropod" },
        { emoji: "🦖", key: "T-Rex" },
        { emoji: "🐳", key: "Spouting Whale" },
        { emoji: "🐋", key: "Whale" },
        { emoji: "🐬", key: "Dolphin" },
        { emoji: "🦭", key: "Seal" },
        { emoji: "🐟", key: "Fish" },
        { emoji: "🐠", key: "Tropical Fish" },
        { emoji: "🐡", key: "Blowfish" },
        { emoji: "🦈", key: "Shark" },
        { emoji: "🐙", key: "Octopus" },
        { emoji: "🐚", key: "Spiral Shell" },
        { emoji: "🐌", key: "Snail" },
        { emoji: "🦋", key: "Butterfly" },
        { emoji: "🐛", key: "Bug" },
        { emoji: "🐜", key: "Ant" },
        { emoji: "🐝", key: "Honeybee" },
        { emoji: "🪲", key: "Beetle" },
        { emoji: "🐞", key: "Lady Beetle" },
        { emoji: "🦗", key: "Cricket" },
        { emoji: "🕷️", key: "Spider" },
        { emoji: "🕸️", key: "Spider Web" },
        { emoji: "🦂", key: "Scorpion" },
        { emoji: "🦟", key: "Mosquito" },
        { emoji: "🪰", key: "Fly" },
        { emoji: "🪱", key: "Worm" },
        { emoji: "🦠", key: "Microbe" },
        { emoji: "💐", key: "Bouquet" },
        { emoji: "🌸", key: "Cherry Blossom" },
        { emoji: "💮", key: "White Flower" },
        { emoji: "🏵️", key: "Rosette" },
        { emoji: "🌹", key: "Rose" },
        { emoji: "🥀", key: "Wilted Flower" },
        { emoji: "🌺", key: "Hibiscus" },
        { emoji: "🌻", key: "Sunflower" },
        { emoji: "🌼", key: "Blossom" },
        { emoji: "🌷", key: "Tulip" },
        { emoji: "🌱", key: "Seedling" },
        { emoji: "🌲", key: "Evergreen Tree" },
        { emoji: "🌳", key: "Deciduous Tree" },
        { emoji: "🌴", key: "Palm Tree" },
        { emoji: "🌵", key: "Cactus" },
        { emoji: "🌾", key: "Sheaf of Rice" },
        { emoji: "🌿", key: "Herb" },
        { emoji: "☘️", key: "Shamrock" },
        { emoji: "🍀", key: "Four Leaf Clover" },
        { emoji: "🍁", key: "Maple Leaf" },
        { emoji: "🍂", key: "Fallen Leaf" },
        { emoji: "🍃", key: "Leaf Fluttering in Wind" },
        { emoji: "🍇", key: "Grapes" },
        { emoji: "🍈", key: "Melon" },
        { emoji: "🍉", key: "Watermelon" },
        { emoji: "🍊", key: "Tangerine" },
        { emoji: "🍋", key: "Lemon" },
        { emoji: "🍌", key: "Banana" },
        { emoji: "🍍", key: "Pineapple" },
        { emoji: "🥭", key: "Mango" },
        { emoji: "🍎", key: "Red Apple" },
        { emoji: "🍏", key: "Green Apple" },
        { emoji: "🍐", key: "Pear" },
        { emoji: "🍑", key: "Peach" },
        { emoji: "🍒", key: "Cherries" },
        { emoji: "🍓", key: "Strawberry" },
        { emoji: "🫐", key: "Blueberries" },
        { emoji: "🥝", key: "Kiwi Fruit" },
        { emoji: "🍅", key: "Tomato" },
        { emoji: "🥥", key: "Coconut" },
        { emoji: "🥑", key: "Avocado" },
        { emoji: "🍆", key: "Eggplant" },
        { emoji: "🥔", key: "Potato" },
        { emoji: "🥕", key: "Carrot" },
        { emoji: "🌽", key: "Ear of Corn" },
        { emoji: "🌶️", key: "Hot Pepper" },
        { emoji: "🫑", key: "Bell Pepper" },
        { emoji: "🌰", key: "Chestnut" },
        { emoji: "🥜", key: "Peanuts" },
        { emoji: "🍯", key: "Honey Pot" },
        { emoji: "🍗", key: "Poultry Leg" },
        { emoji: "🍖", key: "Meat on Bone" },
        { emoji: "🍤", key: "Shrimp" },
        { emoji: "🍳", key: "Cooking" },
        { emoji: "🍔", key: "Hamburger" },
        { emoji: "🍟", key: "French Fries" },
        { emoji: "🍕", key: "Pizza" },
        { emoji: "🫓", key: "Flatbread" },
        { emoji: "🥪", key: "Sandwich" },
        { emoji: "🌭", key: "Hot Dog" },
        { emoji: "🍿", key: "Popcorn" },
        { emoji: "🧂", key: "Salt" },
        { emoji: "🥫", key: "Canned Food" },
        { emoji: "🍱", key: "Bento Box" },
        { emoji: "🍘", key: "Rice Cracker" },
        { emoji: "🍙", key: "Rice Ball" },
        { emoji: "🍚", key: "Cooked Rice" },
        { emoji: "🍛", key: "Curry Rice" },
        { emoji: "🍜", key: "Steaming Bowl" },
        { emoji: "🍝", key: "Spaghetti" },
        { emoji: "🍠", key: "Roasted Sweet Potato" },
        { emoji: "🍢", key: "Oden" },
        { emoji: "🍣", key: "Sushi" },
        { emoji: "🍤", key: "Fried Shrimp" },
        { emoji: "🍥", key: "Fish Cake with Swirl" },
        { emoji: "🥮", key: "Moon Cake" },
        { emoji: "🍡", key: "Dango" },
        { emoji: "🥟", key: "Dumpling" },
        { emoji: "🥠", key: "Fortune Cookie" },
        { emoji: "🥡", key: "Takeout Box" },
        { emoji: "🦀", key: "Crab" },
        { emoji: "🦞", key: "Lobster" },
        { emoji: "🦐", key: "Shrimp" },
        { emoji: "🦑", key: "Squid" },
        { emoji: "🦪", key: "Oyster" },
        { emoji: "🍦", key: "Soft Ice Cream" },
        { emoji: "🍧", key: "Shaved Ice" },
        { emoji: "🍨", key: "Ice Cream" },
        { emoji: "🍩", key: "Doughnut" },
        { emoji: "🍪", key: "Cookie" },
        { emoji: "🎂", key: "Birthday Cake" },
        { emoji: "🍰", key: "Shortcake" },
        { emoji: "🧁", key: "Cupcake" },
        { emoji: "🥧", key: "Pie" },
        { emoji: "🍫", key: "Chocolate Bar" },
        { emoji: "🍬", key: "Candy" },
        { emoji: "🍭", key: "Lollipop" },
        { emoji: "🍮", key: "Custard" },
        { emoji: "🍯", key: "Honey Pot" },
        { emoji: "🍼", key: "Baby Bottle" },
        { emoji: "🥤", key: "Cup with Straw" },
        { emoji: "☕", key: "Hot Beverage" },
        { emoji: "🍵", key: "Teacup Without Handle" },
        { emoji: "🍶", key: "Sake" },
        { emoji: "🍾", key: "Bottle with Popping Cork" },
        { emoji: "🍷", key: "Wine Glass" },
        { emoji: "🍸", key: "Cocktail Glass" },
        { emoji: "🍹", key: "Tropical Drink" },
        { emoji: "🍺", key: "Beer Mug" },
        { emoji: "🍻", key: "Clinking Beer Mugs" },
        { emoji: "🥂", key: "Clinking Glasses" },
        { emoji: "🥃", key: "Tumbler Glass" },
        { emoji: "🥤", key: "Cup with Straw" },
        { emoji: "🧊", key: "Ice" },
        { emoji: "🥢", key: "Chopsticks" },
        { emoji: "🍽️", key: "Fork and Knife with Plate" },
        { emoji: "🍴", key: "Fork and Knife" },
        { emoji: "🥄", key: "Spoon" },
        { emoji: "🔪", key: "Kitchen Knife" },
        { emoji: "🏺", key: "Amphora" },
        { emoji: "🌍", key: "Earth Globe Europe-Africa" },
        { emoji: "🌎", key: "Earth Globe Americas" },
        { emoji: "🌏", key: "Earth Globe Asia-Australia" },
        { emoji: "🌐", key: "Globe with Meridians" },
        { emoji: "🗺️", key: "World Map" },
        { emoji: "🗾", key: "Map of Japan" },      
]   

export const deleteNote = async (note) => {
  try {
    const dataForDeleteNote = await axios.delete(
      `http://localhost:8080/delete-note?token=${
        import.meta.env.VITE_REACT_APP_TOKEN
      }&id=${note._id}`
    );
    return {
      status: "success",
    };
  } catch (error) {
    console.log("deleteTask", error);
    return {
      status: "failure",
    };
  }
};

export const updateNote = async (id, updateObject) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/update-note?token=${
        import.meta.env.VITE_REACT_APP_TOKEN
      }&id=${id}`,
      updateObject,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return {
      status: "success",
    };
  } catch (error) {
    return {
      status: "failure",
    };
  }
};

export const getNote = async (currentNoteId) => {
  try {
    const noteData = await axios.get(
      `http://localhost:8080/get-note?token=${
        import.meta.env.VITE_REACT_APP_TOKEN
      }&id=${currentNoteId}`
    );
    return noteData;
  } catch (error) {
    return { message: error.message };
  }
};
