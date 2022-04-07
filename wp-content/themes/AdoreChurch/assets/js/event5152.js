jQuery(document).ready(function() {
    ticket_id = jQuery(".ticket-id").clone();
    booking_btns = jQuery("#booking-btn").clone();
    info_btns = jQuery("#multi-info-btn").clone();
    ticket_msg = jQuery("#ticket-msg").clone();
    var event_id;
    jQuery("body").on('click','.event-contact-link', function() {
        jQuery('form#contact-manager-form .message').empty();
        event_id = this.id;
    });
    jQuery("body").on('click','.event-register-button', function(e) {
        jQuery('form#user-event-info .message').empty();
        jQuery(".ticket-id").replaceWith(ticket_id.clone());
        jQuery("#booking-btn").replaceWith(booking_btns.clone());
        jQuery("#multi-info-btn").replaceWith(info_btns.clone());
        jQuery("#ticket-msg").replaceWith(ticket_msg.clone());
        event_id = this.id;
        jQuery(".user-details").show();
        jQuery(".book-ticket").hide();
        jQuery("#edit-details").hide();
        jQuery(".ticket-booking-wrapper").animate({
            bottom: 0
        }, 'medium', 'swing', function() {
            jQuery(".ticket-booking-wrapper").find(".ticket-booking-close").animate({
                top: '-40px'
            });
        });
        e.preventDefault();
    });

    function ValidateEmail(email) {
        var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        return expr.test(email);
    };
    jQuery('input#contact-manager').on('click', function(e) {
        $formid = jQuery(this).closest("form").attr('id');
        jQuery("label.error").hide();
        jQuery(".error").removeClass("error");
        jQuery('form#' + $formid + ' .message').empty();
        var $userfield = jQuery("form#" + $formid + " #username1");
        var $emailfield = jQuery("form#" + $formid + " #email1");
        var $phone = jQuery("form#" + $formid + " #phone1").val();
        var $notes = jQuery("form#" + $formid + " #notes1").val();
        var $lastname = jQuery("form#" + $formid + " #lastname1").val();
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var isValid = true;
        if (jQuery.trim($userfield.val()) == '') {
            isValid = false;
            jQuery('form#' + $formid + ' .message').append("<div class=\"alert alert-error\">" + ajax.name + "</div>");
            return false;
        } else if (!ValidateEmail($emailfield.val())) {
            isValid = false;
            jQuery('form#' + $formid + ' .message').append("<div class=\"alert alert-error\">" + ajax.emails + "</div>");
            return false;
        } else {
            jQuery('form#' + $formid + ' .message').empty();
            jQuery('form#' + $formid + ' .message').append("<div class=\"alert alert-success\">" + ajax.forwards + "</div>");
            jQuery.ajax({
                type: 'POST',
                url: ajax.url,
                async: false,
                data: {
                    action: 'imic_contact_event_manager',
                    itemnumber: event_id,
                    name: $userfield.val(),
                    lastname: $lastname,
                    email: $emailfield.val(),
                    phone: $phone,
                    notes: $notes,
                },
                success: function(data) {
                    jQuery('form#' + $formid + ' .message').empty();
                    jQuery('form#' + $formid + ' .message').append(data);

                },
                complete: function() {}

            });
        }
        if (isValid == false) {
            e.preventDefault();
        }
    });
    jQuery('input#user-info').on('click', function(e) {
        $formid = jQuery(this).closest("form").attr('id');
        jQuery("label.error").hide();
        jQuery(".error").removeClass("error");
        jQuery('form#' + $formid + ' .message').empty();
        var $userfield = jQuery("form#" + $formid + " #username");
        var $emailfield = jQuery("form#" + $formid + " #email");
        var $event_date = jQuery("#dy-event-date").text();
        var $phone = jQuery("form#" + $formid + " #phone").val();
        var $notes = jQuery("form#" + $formid + " #notes").val();
        var $lastname = jQuery("form#" + $formid + " #lastname").val();
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var isValid = true;
        if (jQuery.trim($userfield.val()) == '') {
            isValid = false;
            jQuery('form#' + $formid + ' .message').append("<div class=\"alert alert-error\">" + ajax.name + "</div>");
            return false;
        } else if (!ValidateEmail($emailfield.val())) {
            isValid = false;
            jQuery('form#' + $formid + ' .message').append("<div class=\"alert alert-error\">" + ajax.emails + "</div>");
            return false;
        } else {
            var event_multiple_tickets = jQuery(".event_multi_status").text();
            var event_platinum_tickets = jQuery("#dy-event-ticket-seats1").text();
            var event_gold_tickets = jQuery("#dy-event-ticket-seats2").text();
            var event_silver_tickets = jQuery("#dy-event-ticket-seats3").text();
            var platinum_select = '';
            var gold_select = '';
            var silver_select = '';
            if (event_platinum_tickets > 10) {
                platinum_select += '<select name="platinum_select" class="platinum-select ticket-select" id="platinum-select">';
                platinum_select += '<option value="0">Select</option>';
                platinum_select += '<option value="1">1</option>';
                platinum_select += '<option value="2">2</option>';
                platinum_select += '<option value="3">3</option>';
                platinum_select += '<option value="4">4</option>';
                platinum_select += '<option value="5">5</option>';
                platinum_select += '<option value="6">6</option>';
                platinum_select += '<option value="7">7</option>';
                platinum_select += '<option value="8">8</option>';
                platinum_select += '<option value="9">9</option>';
                platinum_select += '<option value="10">10</option>';
                platinum_select += '</select>';
            } else {
                platinum_select += '<select name="platinum_select" class="platinum-select ticket-select" id="platinum-select">';
                platinum_select += '<option value="0">Select</option>';
                for (var i = 1; i <= event_platinum_tickets; i++) {
                    platinum_select += '<option value="' + i + '">' + i + '</option>';
                }
                platinum_select += '</select>';
            }
            if (event_gold_tickets > 10) {
                gold_select += '<select name="gold_select" class="gold-select ticket-select" id="gold-select">';
                gold_select += '<option value="0">Select</option>';
                gold_select += '<option value="1">1</option>';
                gold_select += '<option value="2">2</option>';
                gold_select += '<option value="3">3</option>';
                gold_select += '<option value="4">4</option>';
                gold_select += '<option value="5">5</option>';
                gold_select += '<option value="6">6</option>';
                gold_select += '<option value="7">7</option>';
                gold_select += '<option value="8">8</option>';
                gold_select += '<option value="9">9</option>';
                gold_select += '<option value="10">10</option>';
                gold_select += '</select>';
            } else {
                gold_select += '<select name="gold_select" class="gold-select ticket-select" id="gold-select">';
                gold_select += '<option value="0">Select</option>';
                for (var ig = 1; ig <= event_gold_tickets; ig++) {
                    gold_select += '<option value="' + ig + '">' + ig + '</option>';
                }
                gold_select += '</select>';
            }
            if (event_gold_tickets > 10) {
                silver_select += '<select name="silver_select" class="silver-select ticket-select" id="silver-select">';
                silver_select += '<option value="0">Select</option>';
                silver_select += '<option value="1">1</option>';
                silver_select += '<option value="2">2</option>';
                silver_select += '<option value="3">3</option>';
                silver_select += '<option value="4">4</option>';
                silver_select += '<option value="5">5</option>';
                silver_select += '<option value="6">6</option>';
                silver_select += '<option value="7">7</option>';
                silver_select += '<option value="8">8</option>';
                silver_select += '<option value="9">9</option>';
                silver_select += '<option value="10">10</option>';
                silver_select += '</select>';
            } else {
                silver_select += '<select name="silver_select" class="silver-select ticket-select" id="silver-select">';
                silver_select += '<option value="0">Select</option>';
                for (var is = 1; is <= event_silver_tickets; is++) {
                    silver_select += '<option value="' + is + '">' + is + '</option>';
                }
                silver_select += '</select>';
            }
            if (jQuery("#dy-event-ticket-type1").text() !== '') {
                jQuery("#dy-event-ticket-platinum").html(platinum_select);
            }
            if (jQuery("#dy-event-ticket-type2").text() !== '') {
                jQuery("#dy-event-ticket-gold").html(gold_select);
            }
            if (jQuery("#dy-event-ticket-type3").text() !== '') {
                jQuery("#dy-event-ticket-silver").html(silver_select);
            }

            jQuery(".platinum-select").change(function() {
                var platinum_intRegex = /^\d+$/;
                var platinum_floatRegex = /^((\d+(\.\d *)?)|((\d*\.)?\d+))$/;
                var ticket_price_platinum = jQuery("#dy-event-ticket-amount1").text();
                if (platinum_intRegex.test(ticket_price_platinum) || platinum_floatRegex.test(ticket_price_platinum)) {} else {
                    ticket_price_platinum = 0;
                }
                var new_platinum_cost = ticket_price_platinum * jQuery(this).val();
                jQuery("#dy-event-platinum-totalamount").text(new_platinum_cost);
                var gold_price = Number(jQuery("#dy-event-gold-totalamount").text());
                var silver_price = Number(jQuery("#dy-event-silver-totalamount").text());
                var total_tickets_price = parseInt(Number(new_platinum_cost)) + parseInt(gold_price) + parseInt(silver_price);
                jQuery("#dy-event-totalamount").text(total_tickets_price);
                jQuery("input[name=amount]").val(total_tickets_price);
                if (total_tickets_price === 0 || total_tickets_price === '') {
                    jQuery("form#event_registration_form").attr("action", jQuery("#adore_event_url").text());
                    jQuery("#register-paid-event").attr("value", "Register");
                } else {
                    jQuery("form#event_registration_form").attr("action", jQuery("#adore_event_paypal").text());
                    jQuery("#register-paid-event").attr("value", "Pay");
                }
            });
            jQuery(".gold-select").change(function() {
                var gold_intRegex = /^\d+$/;
                var gold_floatRegex = /^((\d+(\.\d *)?)|((\d*\.)?\d+))$/;
                var ticket_price_gold = jQuery("#dy-event-ticket-amount2").text();
                if (gold_intRegex.test(ticket_price_gold) || gold_floatRegex.test(ticket_price_gold)) {} else {
                    ticket_price_gold = 0;
                }
                var new_gold_cost = ticket_price_gold * jQuery(this).val();
                jQuery("#dy-event-gold-totalamount").text(new_gold_cost);
                var platinum_price = Number(jQuery("#dy-event-platinum-totalamount").text());
                var silver_price = Number(jQuery("#dy-event-silver-totalamount").text());
                var total_tickets_price = parseInt(Number(new_gold_cost)) + parseInt(platinum_price) + parseInt(silver_price);
                jQuery("#dy-event-totalamount").text(total_tickets_price);
                jQuery("input[name=amount]").val(total_tickets_price);
                if (total_tickets_price === 0 || total_tickets_price === '') {
                    jQuery("form#event_registration_form").attr("action", jQuery("#adore_event_url").text());
                    jQuery("#register-paid-event").attr("value", "Register");
                } else {
                    jQuery("form#event_registration_form").attr("action", jQuery("#adore_event_paypal").text());
                    jQuery("#register-paid-event").attr("value", "Pay");
                }
            });
            jQuery(".silver-select").change(function() {
                var silver_intRegex = /^\d+$/;
                var silver_floatRegex = /^((\d+(\.\d *)?)|((\d*\.)?\d+))$/;
                var ticket_price_silver = jQuery("#dy-event-ticket-amount3").text();
                if (silver_intRegex.test(ticket_price_silver) || silver_floatRegex.test(ticket_price_silver)) {} else {
                    ticket_price_silver = 0;
                }
                var new_silver_cost = ticket_price_silver * jQuery(this).val();
                jQuery("#dy-event-silver-totalamount").text(new_silver_cost);
                var platinum_price = Number(jQuery("#dy-event-platinum-totalamount").text());
                var gold_price = Number(jQuery("#dy-event-gold-totalamount").text());
                var total_tickets_price = parseInt(Number(new_silver_cost)) + parseInt(platinum_price) + parseInt(gold_price);
                jQuery("#dy-event-totalamount").text(total_tickets_price);
                jQuery("input[name=amount]").val(total_tickets_price);
                if (total_tickets_price === 0 || total_tickets_price === '') {
                    jQuery("form#event_registration_form").attr("action", jQuery("#adore_event_url").text());
                    jQuery("#register-paid-event").attr("value", "Register");
                } else {
                    jQuery("form#event_registration_form").attr("action", jQuery("#adore_event_paypal").text());
                    jQuery("#register-paid-event").attr("value", "Pay");
                }
            });
            jQuery("input[name=item_number]").val(jQuery("#adore_event_id").text());
            jQuery("input[name=item_name]").val(jQuery("#adore_event_title").text());
            jQuery("input[name=return]").val(jQuery("#adore_event_url").text());
            jQuery("form#event_registration_form").attr("action", jQuery("#adore_event_url").text());
            jQuery(".user-details").hide();
            if (event_multiple_tickets != 1) {
                jQuery(".book-ticket").show();
            } else {
                jQuery(".ticket-details").show();
            }
            jQuery("#edit-details").show();
            jQuery(".ticket-booking-wrapper").find(".book-ticket").animate({
                opacity: 1
            }, 'medium', 'swing', function() {
                jQuery(".event-ticket-left .ticket-cuts-top").animate({
                    top: '-15px'
                }, 'fast', 'swing', function() {
                    jQuery(".event-ticket-left .ticket-cuts-bottom").animate({
                        bottom: '-15px'
                    }, 'fast', 'swing', function() {

                    });
                });
            });
        }
        if (isValid == false) {
            e.preventDefault();
        }


    });
    jQuery("body").on('click','#booking-ticket', function(e) {
        var $userfield = jQuery("form#user-event-info #username");
        var $emailfield = jQuery("form#user-event-info #email");
        var $event_date = jQuery("#dy-event-date").text();
        var $phone = jQuery("form#user-event-info #phone").val();
        var $notes = jQuery("form#user-event-info #notes").val();
        var $lastname = jQuery("form#user-event-info #lastname").val();
        var $members = jQuery('select[name="members"]').val();
        jQuery("#booking-btn").html("<span class=\"btn btn-info btn btn-block ticket-col\">" + ajax.process + "</span>");
        jQuery.ajax({
            type: 'POST',
            url: ajax.url,
            async: false,
            data: {
                action: 'imic_book_event_ticket',
                date: $event_date,
                itemnumber: event_id,
                name: $userfield.val(),
                lastname: $lastname,
                email: $emailfield.val(),
                phone: $phone,
                members: $members,
            },
            success: function(data) {
                jQuery(".ticket-id").html(data);
                jQuery("#booking-btn").html("<span class=\"btn btn-success btn btn-block ticket-col\">" + ajax.book + "</span>");
                jQuery("#multi-info-btn").html("<a class=\"btn btn-sm btn-default\" onClick=\"window.print()\">" + ajax.prints + "</a>");
                jQuery("#ticket-msg").html("<strong>" + ajax.sending + "</strong>");
                jQuery('head').append('<style type="text/css" media="print">div.body, .ticket-booking-close, #multi-info-btn{display:none;}.ticket-booking h3 strong{letter-spacing:0;}.ticket-booking h3{font-size:18px;}@page{size-auto;margin:5mm 5mm 5mm 5mm}body{margin:0;}.ticket-booking-wrapper{top:0;}</style>');
            },
            complete: function() {}

        });
        e.preventDefault();
    });
    jQuery(".ticket-booking-close").on('click', function(e) {
        jQuery(".event-ticket-left .ticket-cuts-bottom").animate({
            bottom: '-30px'
        }, 'fast', 'swing', function() {
            jQuery(".event-ticket-left .ticket-cuts-top").animate({
                top: '-30px'
            }, 'fast', 'swing', function() {
                jQuery(".ticket-booking-wrapper").find(".ticket-booking-close").animate({
                    top: 0
                }, 'fast', 'swing', function() {
                    jQuery(".ticket-booking-wrapper").find(".book-ticket").animate({
                        opacity: 0
                    }, 'fast', 'swing', function() {
                        if (jQuery(window).width() > 767) {
                            jQuery(".ticket-booking-wrapper").animate({
                                bottom: '-300px'
                            });
                        } else {
                            jQuery(".ticket-booking-wrapper").animate({
                                bottom: '-400px'
                            });
                        }
                    });
                });
            });
        });
        e.preventDefault();
    });
    jQuery("body").on('click','#edit-details', function() {
        var event_multiple_tickets = jQuery(".event_multi_status").text();
        jQuery(".user-details").show();
        jQuery(".book-ticket").hide();
        jQuery(".ticket-details").hide();
        jQuery("#edit-details").hide();
    });
    jQuery("#register-paid-event").click(function(e) {
        var isValid = true;
        var selected_ticket = '';
        if (jQuery("#platinum-select option:selected").val() !== '0' && typeof jQuery("#platinum-select option:selected").val() !== 'undefined') {
            isValid = false;
            selected_ticket = parseInt(1);
        } else if (jQuery("#gold-select option:selected").val() !== '0' && typeof jQuery("#gold-select option:selected").val() !== 'undefined') {
            isValid = false;
            selected_ticket = parseInt(1);
        } else if (jQuery("#silver-select option:selected").val() !== '0' && typeof jQuery("#silver-select option:selected").val() !== 'undefined') {
            isValid = false;
            selected_ticket = parseInt(1);
        }
        var edate = jQuery("#adore_event_cdate").text();
        var username = jQuery("#username").val();
        var lastname = jQuery("#lastname").val();
        var email = jQuery("#email").val();
        var phone = jQuery("#phone").val();
        var platinum_tickets = jQuery("#platinum-select option:selected").text();
        var gold_tickets = jQuery("#gold-select option:selected").text();
        var silver_tickets = jQuery("#silver-select option:selected").text();
        var event_id = jQuery("#adore_event_id").text();
        jQuery.ajax({
            type: 'POST',
            url: ajax.url,
            async: false,
            data: {
                action: 'adore_register_paid_event',
                event_id: event_id,
                edate: edate,
                firstname: username,
                lastname: lastname,
                email: email,
                phone: phone,
                platinum: platinum_tickets,
                golds: gold_tickets,
                silvers: silver_tickets,
            },
            success: function(data) {
                var arr_data = data.split('-');
                var total_amount = jQuery("#dy-event-totalamount").text();
                if (total_amount === '0' || total_amount === '') {
                    var form_action = jQuery("form#event_registration_form").attr("action");
                    jQuery("form#event_registration_form").attr("action", form_action + "&registrant=" + arr_data[0] + "&ticket=" + arr_data[1]);
                }
                var form_return = jQuery("input[name=return]").val();
                jQuery("input[name=return]").val(form_return + "&registrant=" + arr_data[0] + "&ticket=" + arr_data[1]);
            },
            complete: function() {}

        });
        if (selected_ticket !== parseInt(1)) {
            //jQuery("#event_registration_form").submit(function(e){
            //jQuery(".message").html('<div class="alert alert-error">Please select ticket</div>');
            alert("Please select ticket");
            e.preventDefault();
            //}); 
        }
    });
    if (ajax.reg == "1") {
        jQuery(".ticket-booking-wrapper").animate({
            bottom: 0
        }, 'medium', 'swing', function() {
            jQuery(".ticket-booking-wrapper").find(".ticket-booking-close").animate({
                top: '-40px'
            });
        });
        jQuery(".ticket-details").hide();
        jQuery(".user-details").hide();
        jQuery(".book-ticket").show();
        jQuery("#edit-details").hide();
        jQuery(".ticket-booking-wrapper").find(".book-ticket").animate({
            opacity: 1
        }, 'medium', 'swing', function() {
            jQuery(".event-ticket-left .ticket-cuts-top").animate({
                top: '-15px'
            }, 'fast', 'swing', function() {
                jQuery(".event-ticket-left .ticket-cuts-bottom").animate({
                    bottom: '-15px'
                }, 'fast', 'swing', function() {

                });
            });
        });
    }
});