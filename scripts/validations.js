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
            rules = rules.split(':');

            //must have only one checkBox (lhs) and many textboxes(rhs)
            if (rules.length === 2) {
                var checkBoxId = rules[0];
                var textBoxIds = rules[1].split(',');
                var isChecked = $("#" + checkBoxId).is(":checked");

                textBoxIds.forEach(function (id) {
                    var value = getValueByType(id);

                    if (isChecked) {
                        if (value) {
                            $("#" + id).removeClass("invalidBorder");
                            valids.push(id);
                        }
                        else {
                            $('#' + id).addClass('invalidBorder');
                            invalids.push();
                        }
                    }
                    else {
                        $("#" + id).removeClass("invalidBorder");
                        valids.push(id);
                    }
                });
            }
        });

        //alternatively return validation summary for controls
        return { Valids: valids, Invalids: invalids };
    }

    function getValueByType(id) {
        var result = "";
        var type = getType(id);
        if (type === "div") {
            result = $("#" + id + "").text();
        }
        else if (type === "text" || type === "textarea") {
            result = $("#" + id + "").val();
        }
        return result.trim();
    }

    function getType(id) {
        var control = $("#" + id + "").get(0);
        var type = "";
        if (control.tagName === "DIV") {
            type = control.tagName.toLowerCase();
        }
        else {
            type = control.type;
        }
        return type;
    }

});