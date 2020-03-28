$(function () {

    $(".performAttributeValidation").click(function () {
        TextboxRequiredWhenCheckboxChecked();
    });

    function TextboxRequiredWhenCheckboxChecked() {
        var valids = [];
        var invalids = [];

        var required_text_when_checks = $("[required_text_when_check]");

        required_text_when_checks.each(function (index, element) {
            var rules = $(element).attr("required_text_when_check");
            rules = rules.split('_');

            //must have only one checkBox (lhs) and many textboxes(rhs)
            if (rules.length == 2) {
                var checkBoxId = rules[0];
                var textBoxIds = rules[1].split(',');
                var isChecked = $("#" + checkBoxId).is(":checked");

                textBoxIds.forEach(function (txtId) {
                    var value = $("#" + txtId).val().trim();

                    if (isChecked) {
                        if (value) {
                            $("#" + txtId).removeClass("invalidBorder");
                            valids.push(txtId);
                        }
                        else {
                            $('#' + txtId).addClass('invalidBorder');
                            invalids.push();
                        }
                    }
                    else {
                        $("#" + txtId).removeClass("invalidBorder");
                        valids.push(txtId);
                    }
                });
            }
        });

        //alternatively return validation summary for controls
        return { Valids: valids, Invalids: invalids };
    }

});