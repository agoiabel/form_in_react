## The complete guide to Forms in React

> Forms are very useful in any web application. Unlike angular and angularjs, that gives form validation out of the box. You have to handle forms yourself in React. This brought about many complications like how to get form values, how do I manage form state, how do I validate my form on the fly and show validation messages. There are different methods and libraries out there to help with this but if you are like me that hates dependent on too many libraries, welcome on board, We are going to bootstrap our own form from the ground up.

There are two types of form input in `react`. We have the `uncontrolled input` and the `controlled input`. The `uncontrolled input` are like traditional HTML form inputs, they remember what you typed. We will use `ref` to get the form values.

<script src="https://gist.github.com/agoiabel/34bb1d4be4c4a507ebff7a3f2151842b.js"></script>

We added the `ref="name"` to the input tag so that we can access the value with `this.refs.name.value` when the form is submitted. The downside to this is that you have to “pull” the value from the field when you need it and this can happen when the form is submitted.

The `controlled input` is when the react component that renders a form also controls what happens in that form on subsequent user input. Meaning, as form value changes, the component that renders the form saves the value in its state.

{% gist https://gist.github.com/agoiabel/e2dc40eb3f69fc4a9e4528394251caf8 %}


Of course, another component can handle the form state. The goal is that each time the input changes, the method `changeHandler` is called and will store the input state. Hence the component always has the current value of the input without needing to ask for it. This means that the form component can respond to input changes immediately; for example

- in-place feedback, like validation
- disabling the button unless all fields have valid data
- enforcing a specific input format

###Handling multiple forms&nbsp;inputs

In most situations, we are going to have more than one form input. We need a way to capture the input with a method instead of declaring multiple methods to do this. Hence we are going to modify the `changeHandler` to below:

{% gist https://gist.github.com/agoiabel/c929082d2167a9e931d2c6f5c20f44ab %}

Because of the way the changeHandler has been modified above, our form input can reference it to update it states dynamically.

{% gist https://gist.github.com/agoiabel/c84c3c33fc9f31de0e7e2c394e749fcf %}


###Create a TextInput Component

There are different input elements e.g text, email, password, select option, checkbox, date, radio button, etc. I love to create a separate custom component for the input elements, let us start with the `text input type`.

{% gist https://gist.github.com/agoiabel/f7e4d365ab3b32265b509d89c18da81e %}

Notice the `{…props}`, we use this to distribute the props to the input element. We can use the custom text input element like below:

{% gist https://gist.github.com/agoiabel/08f8aaf7f12bb9dd2d25928b7b3579cf %}

###Validating our Custom TextInput

Since we are using the `controlled input`, we can add more keys to our formControls state to help validate the input. We need the `valid` property to denote if the input is valid or not, the `validationRules` contains the list of the rules to be checked before the `input` is valid.

{% gist https://gist.github.com/agoiabel/f02b00b4eead53f56969923ddde25d7c %}

Our aim is that each time the input changes. We make sure the validationRules for that input is checked for true or false, then update the valid key with the result of the check. We also added the touched property to denote that the user has touched the form input, this will help with displaying validation feedback when the input has been touched. The check will be done in the changeHandler method like below:

{% gist https://gist.github.com/agoiabel/498b04ebf0f718ad3baaa7468a1e6acb %}

The valid is equated to the methodvalidate(value, prevState.formControls[name]).validationRules) which we will use to check if the valid status for a particular control is true or false.

{% gist https://gist.github.com/agoiabel/486cbe3c560a743b4fc9dc5733ebb2cd %}

I move the validate method to a separate class then import it. The validate method accepts two parameters, the value and the rules. We loop through the rules and check if each rule is valid, then return true when valid and false when invalid.

Let assume we want to add another validation on name e.g we wantname to be required. All we need do is update the formControl for name validationRules, and write the logic for it in the validator class like below

{% gist https://gist.github.com/agoiabel/d0cb482fe47f1e2f38b43c2b6b3db203 %}

Then we need to update the validator class to accommodate for the required validator.

{% gist https://gist.github.com/agoiabel/48bc7a8cd88508a50ec42515af5ed9f9 %}

We created a custom TextInput, we created a formControl that has a property named name with a validation rules of isRequired and minLength of 3. Below is the component that handles this:

{% gist https://gist.github.com/agoiabel/f4a415e49354343ef0539fa2739b1ca0 %}

If we click the submit button after filling the TextInput, the formSubmitHandler will console the formControls value like below

![](https://cdn-images-1.medium.com/max/1600/1*wTQSUDZKzev2j59WLoWqLg.png)*valid = true or&nbsp;false*

The good thing is that we do not have to wait till the user click submit before we can know if the form input is valid or not. Since it is actually stored in the component state, so, therefore, we can use this to display error message or feedback when the user is typing. We can even disable the submit button until the validation passes.


###Displaying error feedback
For us to be able to display error feedback on the input, we need to pass the touched and valid property for that particular input as a prop to it component. We will add the error style based on the valid status and we want to do this only when the input has been touched.

{% gist https://gist.github.com/agoiabel/533b1c9b65f43e237a01cc9ff5720495 %}

We also need to modify our TextInput component to display the style based on the value props.valid and props.touched.

{% gist https://gist.github.com/agoiabel/888f77c07aef92664167d0ea5d97e39e %}

Please note that you should have added the form-control and control-error style into the App.css.

{% gist https://gist.github.com/agoiabel/7fab2f8e860d333e0e6f63c4bf5036d8 %}

You should see a screenshot like below if you TextInput is invalid and had been touched.

![](https://cdn-images-1.medium.com/max/1600/1*ix96HRi05LglXVxIpbgt1A.png)


#Disable Submit Button if the form is Invalid

Html 5 has a disabled property on button input, we can equate our formControls property valid status to the disabled property. As long as the formControls is not valid.

{% gist https://gist.github.com/agoiabel/d1096ec6ffb2283dafa7f31f387106a4 %}

The disabled={!this.state.formControls.name.valid} will work fine if we have only one form control but if we need to handle more than one form control, we can set a new property to the state which will keep track of when the validity status of the whole formControl object. So we need to update our state to accommodate for this

{% gist https://gist.github.com/agoiabel/3ca026c9e9c7043c006d64e4d967d66a %}

We need to update the changeHandler method so we can loop through all form controls valid status, and when valid, update the formIsValid status to true.

{% gist https://gist.github.com/agoiabel/20a288eceffa3b5bae381a5b76dc4a78 %}

With this setup, it will be easier for us to set the disabled property to formIsValid status, and this will handle one or more form object.

{% gist https://gist.github.com/agoiabel/2ede32c13cba4e50d63bbe223ad9ee9f %}


###Considering other form input type

**TEXTAREA**: The textarea, email and password will work similar to a text input. We can create a TextArea component.

{% gist https://gist.github.com/agoiabel/6410a5151add3c8558154a9e49333b07 %}

**EMAIL**: We can also create an Email component just like the TextInput

{% gist https://gist.github.com/agoiabel/dd57edf641c21de7cb1f7af0d17aaa5d %}

**PASSWORD**: We can also create a Password component just like the TextInput

{% gist https://gist.github.com/agoiabel/25214eae8684a8f32891c0a975d93c99 %}

The email, textarea and password form control will look similar to the text input form input

{% gist https://gist.github.com/agoiabel/864f342a67ebeafde733874708bb1b53 %}

**SELECT OPTION**: The Select Option form control is slightly different to the other form control because we have to accommodate for the select options. It will look like to below

{% gist https://gist.github.com/agoiabel/bd0903599f2b8a5e9a332a1c2972f29c %}

then the Select Option component will look like below

{% gist https://gist.github.com/agoiabel/c5f1c1dc9b7e680488908fd2d2fb3e51 %}


**RADIO**: The radio input is similar to the select option since it’s only one option that can be selected out of the available options, The form control will be similar to the select option form control. Below is how the radio button component looks like.

{% gist https://gist.github.com/agoiabel/580ea12e6caf75848d18b8c2a1ff7ca6 %}

Putting it all together, Assuming we want to have an email input, name (TextInput), gender (Select Input), radio input all in a form control. Below is an example of what your component will look like

{% gist https://gist.github.com/agoiabel/65802d08a8a4d8213afbe2c6e9009632 %}

Thanks for reading.