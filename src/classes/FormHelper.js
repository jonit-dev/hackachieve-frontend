export default class FormHelper {
  /**
   * cleanFormOutput: clear form output that's being sent on redux form, removing undefined, null or "" fields
   * @param  formOutput: object
   * @return void
   */
  static cleanFormOutput(formOutput) {
    //remove all empty fields from formOutput
    Object.keys(formOutput).forEach(key =>
      !formOutput[key] ? delete formOutput[key] : null
    );

    return formOutput;
  }
}
