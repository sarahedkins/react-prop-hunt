## React Prop Hunt

An Atom plugin for finding the value of a prop in a React component. Searches parent components for where the prop was passed in, with the intent to make debugging easier.

#### How it works:
Select a variable in the editor <br>
Activate the `hunt` plugin method (CMD + OPT + O) <br>
If the selected text is a prop of the current component, its  origin (where it gets passed in with a value) will be revealed.

#### :warning: Restrictions:
This project is currently a work-in-progress. It is likely overfit to the test case. I do not recommend people use this plugin until I remove this warning. <br>
Additionally, it currently assumes your React project is structured with a `src` folder which contains a `components` folder, and all your components are immediate child files of the `components` folder.
