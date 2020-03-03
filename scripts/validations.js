//this plugin might change when the full list of validation rules and patterns are p
(function () {

    this.ValidateRules = function () {
        //this is our data model, we will add rules and validations to this as needed
        this.validationRules = {
            required_text_when_check: [{
                sourceId: "",
                targetIds: []
            }]
        };

        if (arguments[0] && typeof arguments[0] === "object") {
            //replace the empty model with user specified rules
            this.validationRules = arguments[0];
        }
    }

    //perform validation
    ValidateRules.prototype.validate = function () {
        this.invalidControlIds = [];
        this.validControlIds = [];
        requiredTextWhenCheckValidation.call(this);
    }

    //we will keep on adding similar validation methods when needed.    
    function requiredTextWhenCheckValidation() {
        let rules = this.validationRules.required_text_when_check;
        rules.forEach(rule => {
            let isChecked = $('#' + rule.sourceId).is(":checked");
            if (isChecked) {
                rule.targetIds.forEach(targetId => {
                    checkForControlRequiredValidity.call(this, targetId);
                });
            }
        });
    }

    function checkForControlRequiredValidity(id) {
        //call the existing common method by Ajay here
        //i will just check the text box values here for now
        var enteredValue = $('#' + id).val();
        var isValid = enteredValue && enteredValue.trim();
        if (isValid) {
            this.validControlIds.push(id);
        } else {
            this.invalidControlIds.push(id);
        }
    }

}());