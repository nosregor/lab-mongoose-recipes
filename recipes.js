const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch((err) => {
    console.error('Error connecting to mongo', err);
  });


const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
  ingredients: Array,
  cuisine: { type: String, required: true },
  dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] },
  image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
  duration: { type: Number, min: 0 },
  creator: String,
  created: { type: Date, default: Date.now },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

Recipe.deleteMany({})
  .then(successCallback => console.log('Dropped all documents', successCallback))
  .catch(errorCallback => console.log('error! in dropping collection', errorCallback));

Recipe.create({
  title: 'Apple Pie',
  level: 'Easy Peasy',
  ingredients: ['apples', 'sugar', 'eggs'],
  cuisine: 'French',
  dishType: 'Dessert',
  creator: 'Andrew',
})
  .then((recipe) => { console.log('The recipe is saved and its value is: ', recipe.title); })
  .catch((err) => { console.log('An error happened:', err); });


Recipe.insertMany(data)
  .then((result) => {
    result.forEach((doc) => {
      console.log(doc.title);
    });
  })
  .catch((err) => { console.log('An error happened:', err); });

Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  .then(result => console.log('Updated Rigatoni duration', result))
  .catch(err => console.log('error!', err));

Recipe.deleteOne({ title: 'Carrot Cake' })
  .then(result => console.log('Deleted carrot cake!!!!', result))
  .catch(err => console.log('error! in deleting carrot cake', err));
