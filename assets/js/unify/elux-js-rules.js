/*VALIDATE*/
    !function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){a.extend(a.fn,{validate:function(b){if(!this.length)return void(b&&b.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."));var c=a.data(this[0],"validator");return c?c:(this.attr("novalidate","novalidate"),c=new a.validator(b,this[0]),a.data(this[0],"validator",c),c.settings.onsubmit&&(this.validateDelegate(":submit","click",function(b){c.settings.submitHandler&&(c.submitButton=b.target),a(b.target).hasClass("cancel")&&(c.cancelSubmit=!0),void 0!==a(b.target).attr("formnovalidate")&&(c.cancelSubmit=!0)}),this.submit(function(b){function d(){var d,e;return c.settings.submitHandler?(c.submitButton&&(d=a("<input type='hidden'/>").attr("name",c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)),e=c.settings.submitHandler.call(c,c.currentForm,b),c.submitButton&&d.remove(),void 0!==e?e:!1):!0}return c.settings.debug&&b.preventDefault(),c.cancelSubmit?(c.cancelSubmit=!1,d()):c.form()?c.pendingRequest?(c.formSubmitted=!0,!1):d():(c.focusInvalid(),!1)})),c)},valid:function(){var b,c;return a(this[0]).is("form")?b=this.validate().form():(b=!0,c=a(this[0].form).validate(),this.each(function(){b=c.element(this)&&b})),b},removeAttrs:function(b){var c={},d=this;return a.each(b.split(/\s/),function(a,b){c[b]=d.attr(b),d.removeAttr(b)}),c},rules:function(b,c){var d,e,f,g,h,i,j=this[0];if(b)switch(d=a.data(j.form,"validator").settings,e=d.rules,f=a.validator.staticRules(j),b){case"add":a.extend(f,a.validator.normalizeRule(c)),delete f.messages,e[j.name]=f,c.messages&&(d.messages[j.name]=a.extend(d.messages[j.name],c.messages));break;case"remove":return c?(i={},a.each(c.split(/\s/),function(b,c){i[c]=f[c],delete f[c],"required"===c&&a(j).removeAttr("aria-required")}),i):(delete e[j.name],f)}return g=a.validator.normalizeRules(a.extend({},a.validator.classRules(j),a.validator.attributeRules(j),a.validator.dataRules(j),a.validator.staticRules(j)),j),g.required&&(h=g.required,delete g.required,g=a.extend({required:h},g),a(j).attr("aria-required","true")),g.remote&&(h=g.remote,delete g.remote,g=a.extend(g,{remote:h})),g}}),a.extend(a.expr[":"],{blank:function(b){return!a.trim(""+a(b).val())},filled:function(b){return!!a.trim(""+a(b).val())},unchecked:function(b){return!a(b).prop("checked")}}),a.validator=function(b,c){this.settings=a.extend(!0,{},a.validator.defaults,b),this.currentForm=c,this.init()},a.validator.format=function(b,c){return 1===arguments.length?function(){var c=a.makeArray(arguments);return c.unshift(b),a.validator.format.apply(this,c)}:(arguments.length>2&&c.constructor!==Array&&(c=a.makeArray(arguments).slice(1)),c.constructor!==Array&&(c=[c]),a.each(c,function(a,c){b=b.replace(new RegExp("\\{"+a+"\\}","g"),function(){return c})}),b)},a.extend(a.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusCleanup:!1,focusInvalid:!0,errorContainer:a([]),errorLabelContainer:a([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(a){this.lastActive=a,this.settings.focusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass),this.hideThese(this.errorsFor(a)))},onfocusout:function(a){this.checkable(a)||!(a.name in this.submitted)&&this.optional(a)||this.element(a)},onkeyup:function(a,b){(9!==b.which||""!==this.elementValue(a))&&(a.name in this.submitted||a===this.lastElement)&&this.element(a)},onclick:function(a){a.name in this.submitted?this.element(a):a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).addClass(c).removeClass(d):a(b).addClass(c).removeClass(d)},unhighlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).removeClass(c).addClass(d):a(b).removeClass(c).addClass(d)}},setDefaults:function(b){a.extend(a.validator.defaults,b)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date ( ISO ).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:a.validator.format("Please enter no more than {0} characters."),minlength:a.validator.format("Please enter at least {0} characters."),rangelength:a.validator.format("Please enter a value between {0} and {1} characters long."),range:a.validator.format("Please enter a value between {0} and {1}."),max:a.validator.format("Please enter a value less than or equal to {0}."),min:a.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:!1,prototype:{init:function(){function b(b){var c=a.data(this[0].form,"validator"),d="on"+b.type.replace(/^validate/,""),e=c.settings;e[d]&&!this.is(e.ignore)&&e[d].call(c,this[0],b)}this.labelContainer=a(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||a(this.currentForm),this.containers=a(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var c,d=this.groups={};a.each(this.settings.groups,function(b,c){"string"==typeof c&&(c=c.split(/\s/)),a.each(c,function(a,c){d[c]=b})}),c=this.settings.rules,a.each(c,function(b,d){c[b]=a.validator.normalizeRule(d)}),a(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']","focusin focusout keyup",b).validateDelegate("select, option, [type='radio'], [type='checkbox']","click",b),this.settings.invalidHandler&&a(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler),a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required","true")},form:function(){return this.checkForm(),a.extend(this.submitted,this.errorMap),this.invalid=a.extend({},this.errorMap),this.valid()||a(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(b){var c=this.clean(b),d=this.validationTargetFor(c),e=!0;return this.lastElement=d,void 0===d?delete this.invalid[c.name]:(this.prepareElement(d),this.currentElements=a(d),e=this.check(d)!==!1,e?delete this.invalid[d.name]:this.invalid[d.name]=!0),a(b).attr("aria-invalid",!e),this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),e},showErrors:function(b){if(b){a.extend(this.errorMap,b),this.errorList=[];for(var c in b)this.errorList.push({message:b[c],element:this.findByName(c)[0]});this.successList=a.grep(this.successList,function(a){return!(a.name in b)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){a.fn.resetForm&&a(this.currentForm).resetForm(),this.submitted={},this.lastElement=null,this.prepareForm(),this.hideErrors(),this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid")},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(a){var b,c=0;for(b in a)c++;return c},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(a){a.not(this.containers).text(""),this.addWrapper(a).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{a(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(b){}},findLastActive:function(){var b=this.lastActive;return b&&1===a.grep(this.errorList,function(a){return a.element.name===b.name}).length&&b},elements:function(){var b=this,c={};return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled], [readonly]").not(this.settings.ignore).filter(function(){return!this.name&&b.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.name in c||!b.objectLength(a(this).rules())?!1:(c[this.name]=!0,!0)})},clean:function(b){return a(b)[0]},errors:function(){var b=this.settings.errorClass.split(" ").join(".");return a(this.settings.errorElement+"."+b,this.errorContext)},reset:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=a([]),this.toHide=a([]),this.currentElements=a([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(a){this.reset(),this.toHide=this.errorsFor(a)},elementValue:function(b){var c,d=a(b),e=b.type;return"radio"===e||"checkbox"===e?a("input[name='"+b.name+"']:checked").val():"number"===e&&"undefined"!=typeof b.validity?b.validity.badInput?!1:d.val():(c=d.val(),"string"==typeof c?c.replace(/\r/g,""):c)},check:function(b){b=this.validationTargetFor(this.clean(b));var c,d,e,f=a(b).rules(),g=a.map(f,function(a,b){return b}).length,h=!1,i=this.elementValue(b);for(d in f){e={method:d,parameters:f[d]};try{if(c=a.validator.methods[d].call(this,i,b,e.parameters),"dependency-mismatch"===c&&1===g){h=!0;continue}if(h=!1,"pending"===c)return void(this.toHide=this.toHide.not(this.errorsFor(b)));if(!c)return this.formatAndAdd(b,e),!1}catch(j){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+b.id+", check the '"+e.method+"' method.",j),j}}if(!h)return this.objectLength(f)&&this.successList.push(b),!0},customDataMessage:function(b,c){return a(b).data("msg"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase())||a(b).data("msg")},customMessage:function(a,b){var c=this.settings.messages[a];return c&&(c.constructor===String?c:c[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(void 0!==arguments[a])return arguments[a];return void 0},defaultMessage:function(b,c){return this.findDefined(this.customMessage(b.name,c),this.customDataMessage(b,c),!this.settings.ignoreTitle&&b.title||void 0,a.validator.messages[c],"<strong>Warning: No message defined for "+b.name+"</strong>")},formatAndAdd:function(b,c){var d=this.defaultMessage(b,c.method),e=/\$?\{(\d+)\}/g;"function"==typeof d?d=d.call(this,c.parameters,b):e.test(d)&&(d=a.validator.format(d.replace(e,"{$1}"),c.parameters)),this.errorList.push({message:d,element:b,method:c.method}),this.errorMap[b.name]=d,this.submitted[b.name]=d},addWrapper:function(a){return this.settings.wrapper&&(a=a.add(a.parent(this.settings.wrapper))),a},defaultShowErrors:function(){var a,b,c;for(a=0;this.errorList[a];a++)c=this.errorList[a],this.settings.highlight&&this.settings.highlight.call(this,c.element,this.settings.errorClass,this.settings.validClass),this.showLabel(c.element,c.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight)for(a=0,b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return a(this.errorList).map(function(){return this.element})},showLabel:function(b,c){var d,e,f,g=this.errorsFor(b),h=this.idOrName(b),i=a(b).attr("aria-describedby");g.length?(g.removeClass(this.settings.validClass).addClass(this.settings.errorClass),g.html(c)):(g=a("<"+this.settings.errorElement+">").attr("id",h+"-error").addClass(this.settings.errorClass).html(c||""),d=g,this.settings.wrapper&&(d=g.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.length?this.labelContainer.append(d):this.settings.errorPlacement?this.settings.errorPlacement(d,a(b)):d.insertAfter(b),g.is("label")?g.attr("for",h):0===g.parents("label[for='"+h+"']").length&&(f=g.attr("id").replace(/(:|\.|\[|\])/g,"\\$1"),i?i.match(new RegExp("\\b"+f+"\\b"))||(i+=" "+f):i=f,a(b).attr("aria-describedby",i),e=this.groups[b.name],e&&a.each(this.groups,function(b,c){c===e&&a("[name='"+b+"']",this.currentForm).attr("aria-describedby",g.attr("id"))}))),!c&&this.settings.success&&(g.text(""),"string"==typeof this.settings.success?g.addClass(this.settings.success):this.settings.success(g,b)),this.toShow=this.toShow.add(g)},errorsFor:function(b){var c=this.idOrName(b),d=a(b).attr("aria-describedby"),e="label[for='"+c+"'], label[for='"+c+"'] *";return d&&(e=e+", #"+d.replace(/\s+/g,", #")),this.errors().filter(e)},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},validationTargetFor:function(b){return this.checkable(b)&&(b=this.findByName(b.name)),a(b).not(this.settings.ignore)[0]},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(b){return a(this.currentForm).find("[name='"+b+"']")},getLength:function(b,c){switch(c.nodeName.toLowerCase()){case"select":return a("option:selected",c).length;case"input":if(this.checkable(c))return this.findByName(c.name).filter(":checked").length}return b.length},depend:function(a,b){return this.dependTypes[typeof a]?this.dependTypes[typeof a](a,b):!0},dependTypes:{"boolean":function(a){return a},string:function(b,c){return!!a(b,c.form).length},"function":function(a,b){return a(b)}},optional:function(b){var c=this.elementValue(b);return!a.validator.methods.required.call(this,c,b)&&"dependency-mismatch"},startRequest:function(a){this.pending[a.name]||(this.pendingRequest++,this.pending[a.name]=!0)},stopRequest:function(b,c){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[b.name],c&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(a(this.currentForm).submit(),this.formSubmitted=!1):!c&&0===this.pendingRequest&&this.formSubmitted&&(a(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(b){return a.data(b,"previousValue")||a.data(b,"previousValue",{old:null,valid:!0,message:this.defaultMessage(b,"remote")})}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(b,c){b.constructor===String?this.classRuleSettings[b]=c:a.extend(this.classRuleSettings,b)},classRules:function(b){var c={},d=a(b).attr("class");return d&&a.each(d.split(" "),function(){this in a.validator.classRuleSettings&&a.extend(c,a.validator.classRuleSettings[this])}),c},attributeRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)"required"===c?(d=b.getAttribute(c),""===d&&(d=!0),d=!!d):d=f.attr(c),/min|max/.test(c)&&(null===g||/number|range|text/.test(g))&&(d=Number(d)),d||0===d?e[c]=d:g===c&&"range"!==g&&(e[c]=!0);return e.maxlength&&/-1|2147483647|524288/.test(e.maxlength)&&delete e.maxlength,e},dataRules:function(b){var c,d,e={},f=a(b);for(c in a.validator.methods)d=f.data("rule"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase()),void 0!==d&&(e[c]=d);return e},staticRules:function(b){var c={},d=a.data(b.form,"validator");return d.settings.rules&&(c=a.validator.normalizeRule(d.settings.rules[b.name])||{}),c},normalizeRules:function(b,c){return a.each(b,function(d,e){if(e===!1)return void delete b[d];if(e.param||e.depends){var f=!0;switch(typeof e.depends){case"string":f=!!a(e.depends,c.form).length;break;case"function":f=e.depends.call(c,c)}f?b[d]=void 0!==e.param?e.param:!0:delete b[d]}}),a.each(b,function(d,e){b[d]=a.isFunction(e)?e(c):e}),a.each(["minlength","maxlength"],function(){b[this]&&(b[this]=Number(b[this]))}),a.each(["rangelength","range"],function(){var c;b[this]&&(a.isArray(b[this])?b[this]=[Number(b[this][0]),Number(b[this][1])]:"string"==typeof b[this]&&(c=b[this].replace(/[\[\]]/g,"").split(/[\s,]+/),b[this]=[Number(c[0]),Number(c[1])]))}),a.validator.autoCreateRanges&&(null!=b.min&&null!=b.max&&(b.range=[b.min,b.max],delete b.min,delete b.max),null!=b.minlength&&null!=b.maxlength&&(b.rangelength=[b.minlength,b.maxlength],delete b.minlength,delete b.maxlength)),b},normalizeRule:function(b){if("string"==typeof b){var c={};a.each(b.split(/\s/),function(){c[this]=!0}),b=c}return b},addMethod:function(b,c,d){a.validator.methods[b]=c,a.validator.messages[b]=void 0!==d?d:a.validator.messages[b],c.length<3&&a.validator.addClassRules(b,a.validator.normalizeRule(b))},methods:{required:function(b,c,d){if(!this.depend(d,c))return"dependency-mismatch";if("select"===c.nodeName.toLowerCase()){var e=a(c).val();return e&&e.length>0}return this.checkable(c)?this.getLength(b,c)>0:a.trim(b).length>0},email:function(a,b){return this.optional(b)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)},url:function(a,b){return this.optional(b)||/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)},date:function(a,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(a).toString())},dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a)},number:function(a,b){return this.optional(b)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},creditcard:function(a,b){if(this.optional(b))return"dependency-mismatch";if(/[^0-9 \-]+/.test(a))return!1;var c,d,e=0,f=0,g=!1;if(a=a.replace(/\D/g,""),a.length<13||a.length>19)return!1;for(c=a.length-1;c>=0;c--)d=a.charAt(c),f=parseInt(d,10),g&&(f*=2)>9&&(f-=9),e+=f,g=!g;return e%10===0},minlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d},maxlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||d>=e},rangelength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d[0]&&e<=d[1]},min:function(a,b,c){return this.optional(b)||a>=c},max:function(a,b,c){return this.optional(b)||c>=a},range:function(a,b,c){return this.optional(b)||a>=c[0]&&a<=c[1]},equalTo:function(b,c,d){var e=a(d);return this.settings.onfocusout&&e.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){a(c).valid()}),b===e.val()},remote:function(b,c,d){if(this.optional(c))return"dependency-mismatch";var e,f,g=this.previousValue(c);return this.settings.messages[c.name]||(this.settings.messages[c.name]={}),g.originalMessage=this.settings.messages[c.name].remote,this.settings.messages[c.name].remote=g.message,d="string"==typeof d&&{url:d}||d,g.old===b?g.valid:(g.old=b,e=this,this.startRequest(c),f={},f[c.name]=b,a.ajax(a.extend(!0,{url:d,mode:"abort",port:"validate"+c.name,dataType:"json",data:f,context:e.currentForm,success:function(d){var f,h,i,j=d===!0||"true"===d;e.settings.messages[c.name].remote=g.originalMessage,j?(i=e.formSubmitted,e.prepareElement(c),e.formSubmitted=i,e.successList.push(c),delete e.invalid[c.name],e.showErrors()):(f={},h=d||e.defaultMessage(c,"remote"),f[c.name]=g.message=a.isFunction(h)?h(b):h,e.invalid[c.name]=!0,e.showErrors(f)),g.valid=j,e.stopRequest(c,j)}},d)),"pending")}}}),a.format=function(){throw"$.format has been deprecated. Please use $.validator.format instead."};var b,c={};a.ajaxPrefilter?a.ajaxPrefilter(function(a,b,d){var e=a.port;"abort"===a.mode&&(c[e]&&c[e].abort(),c[e]=d)}):(b=a.ajax,a.ajax=function(d){var e=("mode"in d?d:a.ajaxSettings).mode,f=("port"in d?d:a.ajaxSettings).port;return"abort"===e?(c[f]&&c[f].abort(),c[f]=b.apply(this,arguments),c[f]):b.apply(this,arguments)}),a.extend(a.fn,{validateDelegate:function(b,c,d){return this.bind(c,function(c){var e=a(c.target);return e.is(b)?d.apply(e,arguments):void 0})}})});
    
/* jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/ */
    jQuery.easing.jswing=jQuery.easing.swing,jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(n,e,t,u,a){return jQuery.easing[jQuery.easing.def](n,e,t,u,a)},easeInQuad:function(n,e,t,u,a){return u*(e/=a)*e+t},easeOutQuad:function(n,e,t,u,a){return-u*(e/=a)*(e-2)+t},easeInOutQuad:function(n,e,t,u,a){return(e/=a/2)<1?u/2*e*e+t:-u/2*(--e*(e-2)-1)+t},easeInCubic:function(n,e,t,u,a){return u*(e/=a)*e*e+t},easeOutCubic:function(n,e,t,u,a){return u*((e=e/a-1)*e*e+1)+t},easeInOutCubic:function(n,e,t,u,a){return(e/=a/2)<1?u/2*e*e*e+t:u/2*((e-=2)*e*e+2)+t},easeInQuart:function(n,e,t,u,a){return u*(e/=a)*e*e*e+t},easeOutQuart:function(n,e,t,u,a){return-u*((e=e/a-1)*e*e*e-1)+t},easeInOutQuart:function(n,e,t,u,a){return(e/=a/2)<1?u/2*e*e*e*e+t:-u/2*((e-=2)*e*e*e-2)+t},easeInQuint:function(n,e,t,u,a){return u*(e/=a)*e*e*e*e+t},easeOutQuint:function(n,e,t,u,a){return u*((e=e/a-1)*e*e*e*e+1)+t},easeInOutQuint:function(n,e,t,u,a){return(e/=a/2)<1?u/2*e*e*e*e*e+t:u/2*((e-=2)*e*e*e*e+2)+t},easeInSine:function(n,e,t,u,a){return-u*Math.cos(e/a*(Math.PI/2))+u+t},easeOutSine:function(n,e,t,u,a){return u*Math.sin(e/a*(Math.PI/2))+t},easeInOutSine:function(n,e,t,u,a){return-u/2*(Math.cos(Math.PI*e/a)-1)+t},easeInExpo:function(n,e,t,u,a){return 0==e?t:u*Math.pow(2,10*(e/a-1))+t},easeOutExpo:function(n,e,t,u,a){return e==a?t+u:u*(-Math.pow(2,-10*e/a)+1)+t},easeInOutExpo:function(n,e,t,u,a){return 0==e?t:e==a?t+u:(e/=a/2)<1?u/2*Math.pow(2,10*(e-1))+t:u/2*(-Math.pow(2,-10*--e)+2)+t},easeInCirc:function(n,e,t,u,a){return-u*(Math.sqrt(1-(e/=a)*e)-1)+t},easeOutCirc:function(n,e,t,u,a){return u*Math.sqrt(1-(e=e/a-1)*e)+t},easeInOutCirc:function(n,e,t,u,a){return(e/=a/2)<1?-u/2*(Math.sqrt(1-e*e)-1)+t:u/2*(Math.sqrt(1-(e-=2)*e)+1)+t},easeInElastic:function(n,e,t,u,a){var r=1.70158,i=0,s=u;if(0==e)return t;if(1==(e/=a))return t+u;if(i||(i=.3*a),s<Math.abs(u)){s=u;var r=i/4}else var r=i/(2*Math.PI)*Math.asin(u/s);return-(s*Math.pow(2,10*(e-=1))*Math.sin(2*(e*a-r)*Math.PI/i))+t},easeOutElastic:function(n,e,t,u,a){var r=1.70158,i=0,s=u;if(0==e)return t;if(1==(e/=a))return t+u;if(i||(i=.3*a),s<Math.abs(u)){s=u;var r=i/4}else var r=i/(2*Math.PI)*Math.asin(u/s);return s*Math.pow(2,-10*e)*Math.sin(2*(e*a-r)*Math.PI/i)+u+t},easeInOutElastic:function(n,e,t,u,a){var r=1.70158,i=0,s=u;if(0==e)return t;if(2==(e/=a/2))return t+u;if(i||(i=.3*a*1.5),s<Math.abs(u)){s=u;var r=i/4}else var r=i/(2*Math.PI)*Math.asin(u/s);return 1>e?-.5*s*Math.pow(2,10*(e-=1))*Math.sin(2*(e*a-r)*Math.PI/i)+t:s*Math.pow(2,-10*(e-=1))*Math.sin(2*(e*a-r)*Math.PI/i)*.5+u+t},easeInBack:function(n,e,t,u,a,r){return void 0==r&&(r=1.70158),u*(e/=a)*e*((r+1)*e-r)+t},easeOutBack:function(n,e,t,u,a,r){return void 0==r&&(r=1.70158),u*((e=e/a-1)*e*((r+1)*e+r)+1)+t},easeInOutBack:function(n,e,t,u,a,r){return void 0==r&&(r=1.70158),(e/=a/2)<1?u/2*e*e*(((r*=1.525)+1)*e-r)+t:u/2*((e-=2)*e*(((r*=1.525)+1)*e+r)+2)+t},easeInBounce:function(n,e,t,u,a){return u-jQuery.easing.easeOutBounce(n,a-e,0,u,a)+t},easeOutBounce:function(n,e,t,u,a){return(e/=a)<1/2.75?7.5625*u*e*e+t:2/2.75>e?u*(7.5625*(e-=1.5/2.75)*e+.75)+t:2.5/2.75>e?u*(7.5625*(e-=2.25/2.75)*e+.9375)+t:u*(7.5625*(e-=2.625/2.75)*e+.984375)+t},easeInOutBounce:function(n,e,t,u,a){return a/2>e?.5*jQuery.easing.easeInBounce(n,2*e,0,u,a)+t:.5*jQuery.easing.easeOutBounce(n,2*e-a,0,u,a)+.5*u+t}});
    
/*OWL*/
    "function"!=typeof Object.create&&(Object.create=function(t){function i(){}return i.prototype=t,new i}),function(t,i,s){var e={init:function(i,s){this.$elem=t(s),this.options=t.extend({},t.fn.owlCarousel.options,this.$elem.data(),i),this.userOptions=i,this.loadContent()},loadContent:function(){function i(t){var i,s="";if("function"==typeof e.options.jsonSuccess)e.options.jsonSuccess.apply(this,[t]);else{for(i in t.owl)t.owl.hasOwnProperty(i)&&(s+=t.owl[i].item);e.$elem.html(s)}e.logIn()}var s,e=this;"function"==typeof e.options.beforeInit&&e.options.beforeInit.apply(this,[e.$elem]),"string"==typeof e.options.jsonPath?(s=e.options.jsonPath,t.getJSON(s,i)):e.logIn()},logIn:function(){this.$elem.data("owl-originalStyles",this.$elem.attr("style")),this.$elem.data("owl-originalClasses",this.$elem.attr("class")),this.$elem.css({opacity:0}),this.orignalItems=this.options.items,this.checkBrowser(),this.wrapperWidth=0,this.checkVisible=null,this.setVars()},setVars:function(){return 0===this.$elem.children().length?!1:(this.baseClass(),this.eventTypes(),this.$userItems=this.$elem.children(),this.itemsAmount=this.$userItems.length,this.wrapItems(),this.$owlItems=this.$elem.find(".owl-item"),this.$owlWrapper=this.$elem.find(".owl-wrapper"),this.playDirection="next",this.prevItem=0,this.prevArr=[0],this.currentItem=0,this.customEvents(),void this.onStartup())},onStartup:function(){this.updateItems(),this.calculateAll(),this.buildControls(),this.updateControls(),this.response(),this.moveEvents(),this.stopOnHover(),this.owlStatus(),!1!==this.options.transitionStyle&&this.transitionTypes(this.options.transitionStyle),!0===this.options.autoPlay&&(this.options.autoPlay=5e3),this.play(),this.$elem.find(".owl-wrapper").css("display","block"),this.$elem.is(":visible")?this.$elem.css("opacity",1):this.watchVisibility(),this.onstartup=!1,this.eachMoveUpdate(),"function"==typeof this.options.afterInit&&this.options.afterInit.apply(this,[this.$elem])},eachMoveUpdate:function(){!0===this.options.lazyLoad&&this.lazyLoad(),!0===this.options.autoHeight&&this.autoHeight(),this.onVisibleItems(),"function"==typeof this.options.afterAction&&this.options.afterAction.apply(this,[this.$elem])},updateVars:function(){"function"==typeof this.options.beforeUpdate&&this.options.beforeUpdate.apply(this,[this.$elem]),this.watchVisibility(),this.updateItems(),this.calculateAll(),this.updatePosition(),this.updateControls(),this.eachMoveUpdate(),"function"==typeof this.options.afterUpdate&&this.options.afterUpdate.apply(this,[this.$elem])},reload:function(){var t=this;i.setTimeout(function(){t.updateVars()},0)},watchVisibility:function(){var t=this;return!1!==t.$elem.is(":visible")?!1:(t.$elem.css({opacity:0}),i.clearInterval(t.autoPlayInterval),i.clearInterval(t.checkVisible),void(t.checkVisible=i.setInterval(function(){t.$elem.is(":visible")&&(t.reload(),t.$elem.animate({opacity:1},200),i.clearInterval(t.checkVisible))},500)))},wrapItems:function(){this.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>'),this.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">'),this.wrapperOuter=this.$elem.find(".owl-wrapper-outer"),this.$elem.css("display","block")},baseClass:function(){var t=this.$elem.hasClass(this.options.baseClass),i=this.$elem.hasClass(this.options.theme);t||this.$elem.addClass(this.options.baseClass),i||this.$elem.addClass(this.options.theme)},updateItems:function(){var i,s;if(!1===this.options.responsive)return!1;if(!0===this.options.singleItem)return this.options.items=this.orignalItems=1,this.options.itemsCustom=!1,this.options.itemsDesktop=!1,this.options.itemsDesktopSmall=!1,this.options.itemsTablet=!1,this.options.itemsTabletSmall=!1,this.options.itemsMobile=!1;if(i=t(this.options.responsiveBaseWidth).width(),i>(this.options.itemsDesktop[0]||this.orignalItems)&&(this.options.items=this.orignalItems),!1!==this.options.itemsCustom)for(this.options.itemsCustom.sort(function(t,i){return t[0]-i[0]}),s=0;s<this.options.itemsCustom.length;s+=1)this.options.itemsCustom[s][0]<=i&&(this.options.items=this.options.itemsCustom[s][1]);else i<=this.options.itemsDesktop[0]&&!1!==this.options.itemsDesktop&&(this.options.items=this.options.itemsDesktop[1]),i<=this.options.itemsDesktopSmall[0]&&!1!==this.options.itemsDesktopSmall&&(this.options.items=this.options.itemsDesktopSmall[1]),i<=this.options.itemsTablet[0]&&!1!==this.options.itemsTablet&&(this.options.items=this.options.itemsTablet[1]),i<=this.options.itemsTabletSmall[0]&&!1!==this.options.itemsTabletSmall&&(this.options.items=this.options.itemsTabletSmall[1]),i<=this.options.itemsMobile[0]&&!1!==this.options.itemsMobile&&(this.options.items=this.options.itemsMobile[1]);this.options.items>this.itemsAmount&&!0===this.options.itemsScaleUp&&(this.options.items=this.itemsAmount)},response:function(){var s,e,o=this;return!0!==o.options.responsive?!1:(e=t(i).width(),o.resizer=function(){t(i).width()!==e&&(!1!==o.options.autoPlay&&i.clearInterval(o.autoPlayInterval),i.clearTimeout(s),s=i.setTimeout(function(){e=t(i).width(),o.updateVars()},o.options.responsiveRefreshRate))},void t(i).resize(o.resizer))},updatePosition:function(){this.jumpTo(this.currentItem),!1!==this.options.autoPlay&&this.checkAp()},appendItemsSizes:function(){var i=this,s=0,e=i.itemsAmount-i.options.items;i.$owlItems.each(function(o){var n=t(this);n.css({width:i.itemWidth}).data("owl-item",Number(o)),(0===o%i.options.items||o===e)&&(o>e||(s+=1)),n.data("owl-roundPages",s)})},appendWrapperSizes:function(){this.$owlWrapper.css({width:this.$owlItems.length*this.itemWidth*2,left:0}),this.appendItemsSizes()},calculateAll:function(){this.calculateWidth(),this.appendWrapperSizes(),this.loops(),this.max()},calculateWidth:function(){this.itemWidth=Math.round(this.$elem.width()/this.options.items)},max:function(){var t=-1*(this.itemsAmount*this.itemWidth-this.options.items*this.itemWidth);return this.options.items>this.itemsAmount?this.maximumPixels=t=this.maximumItem=0:(this.maximumItem=this.itemsAmount-this.options.items,this.maximumPixels=t),t},min:function(){return 0},loops:function(){var i,s,e=0,o=0;for(this.positionsInArray=[0],this.pagesInArray=[],i=0;i<this.itemsAmount;i+=1)o+=this.itemWidth,this.positionsInArray.push(-o),!0===this.options.scrollPerPage&&(s=t(this.$owlItems[i]),s=s.data("owl-roundPages"),s!==e&&(this.pagesInArray[e]=this.positionsInArray[i],e=s))},buildControls:function(){(!0===this.options.navigation||!0===this.options.pagination)&&(this.owlControls=t('<div class="owl-controls"/>').toggleClass("clickable",!this.browser.isTouch).appendTo(this.$elem)),!0===this.options.pagination&&this.buildPagination(),!0===this.options.navigation&&this.buildButtons()},buildButtons:function(){var i=this,s=t('<div class="owl-buttons"/>');i.owlControls.append(s),i.buttonPrev=t("<div/>",{"class":"owl-prev",html:i.options.navigationText[0]||""}),i.buttonNext=t("<div/>",{"class":"owl-next",html:i.options.navigationText[1]||""}),s.append(i.buttonPrev).append(i.buttonNext),s.on("touchstart.owlControls mousedown.owlControls",'div[class^="owl"]',function(t){t.preventDefault()}),s.on("touchend.owlControls mouseup.owlControls",'div[class^="owl"]',function(s){s.preventDefault(),t(this).hasClass("owl-next")?i.next():i.prev()})},buildPagination:function(){var i=this;i.paginationWrapper=t('<div class="owl-pagination"/>'),i.owlControls.append(i.paginationWrapper),i.paginationWrapper.on("touchend.owlControls mouseup.owlControls",".owl-page",function(s){s.preventDefault(),Number(t(this).data("owl-page"))!==i.currentItem&&i.goTo(Number(t(this).data("owl-page")),!0)})},updatePagination:function(){var i,s,e,o,n,a;if(!1===this.options.pagination)return!1;for(this.paginationWrapper.html(""),i=0,s=this.itemsAmount-this.itemsAmount%this.options.items,o=0;o<this.itemsAmount;o+=1)0===o%this.options.items&&(i+=1,s===o&&(e=this.itemsAmount-this.options.items),n=t("<div/>",{"class":"owl-page"}),a=t("<span></span>",{text:!0===this.options.paginationNumbers?i:"","class":!0===this.options.paginationNumbers?"owl-numbers":""}),n.append(a),n.data("owl-page",s===o?e:o),n.data("owl-roundPages",i),this.paginationWrapper.append(n));this.checkPagination()},checkPagination:function(){var i=this;return!1===i.options.pagination?!1:void i.paginationWrapper.find(".owl-page").each(function(){t(this).data("owl-roundPages")===t(i.$owlItems[i.currentItem]).data("owl-roundPages")&&(i.paginationWrapper.find(".owl-page").removeClass("active"),t(this).addClass("active"))})},checkNavigation:function(){return!1===this.options.navigation?!1:void(!1===this.options.rewindNav&&(0===this.currentItem&&0===this.maximumItem?(this.buttonPrev.addClass("disabled"),this.buttonNext.addClass("disabled")):0===this.currentItem&&0!==this.maximumItem?(this.buttonPrev.addClass("disabled"),this.buttonNext.removeClass("disabled")):this.currentItem===this.maximumItem?(this.buttonPrev.removeClass("disabled"),this.buttonNext.addClass("disabled")):0!==this.currentItem&&this.currentItem!==this.maximumItem&&(this.buttonPrev.removeClass("disabled"),this.buttonNext.removeClass("disabled"))))},updateControls:function(){this.updatePagination(),this.checkNavigation(),this.owlControls&&(this.options.items>=this.itemsAmount?this.owlControls.hide():this.owlControls.show())},destroyControls:function(){this.owlControls&&this.owlControls.remove()},next:function(t){if(this.isTransition)return!1;if(this.currentItem+=!0===this.options.scrollPerPage?this.options.items:1,this.currentItem>this.maximumItem+(!0===this.options.scrollPerPage?this.options.items-1:0)){if(!0!==this.options.rewindNav)return this.currentItem=this.maximumItem,!1;this.currentItem=0,t="rewind"}this.goTo(this.currentItem,t)},prev:function(t){if(this.isTransition)return!1;if(this.currentItem=!0===this.options.scrollPerPage&&0<this.currentItem&&this.currentItem<this.options.items?0:this.currentItem-(!0===this.options.scrollPerPage?this.options.items:1),0>this.currentItem){if(!0!==this.options.rewindNav)return this.currentItem=0,!1;this.currentItem=this.maximumItem,t="rewind"}this.goTo(this.currentItem,t)},goTo:function(t,s,e){var o=this;return o.isTransition?!1:("function"==typeof o.options.beforeMove&&o.options.beforeMove.apply(this,[o.$elem]),t>=o.maximumItem?t=o.maximumItem:0>=t&&(t=0),o.currentItem=o.owl.currentItem=t,!1!==o.options.transitionStyle&&"drag"!==e&&1===o.options.items&&!0===o.browser.support3d?(o.swapSpeed(0),!0===o.browser.support3d?o.transition3d(o.positionsInArray[t]):o.css2slide(o.positionsInArray[t],1),o.afterGo(),o.singleItemTransition(),!1):(t=o.positionsInArray[t],!0===o.browser.support3d?(o.isCss3Finish=!1,!0===s?(o.swapSpeed("paginationSpeed"),i.setTimeout(function(){o.isCss3Finish=!0},o.options.paginationSpeed)):"rewind"===s?(o.swapSpeed(o.options.rewindSpeed),i.setTimeout(function(){o.isCss3Finish=!0},o.options.rewindSpeed)):(o.swapSpeed("slideSpeed"),i.setTimeout(function(){o.isCss3Finish=!0},o.options.slideSpeed)),o.transition3d(t)):!0===s?o.css2slide(t,o.options.paginationSpeed):"rewind"===s?o.css2slide(t,o.options.rewindSpeed):o.css2slide(t,o.options.slideSpeed),void o.afterGo()))},jumpTo:function(t){"function"==typeof this.options.beforeMove&&this.options.beforeMove.apply(this,[this.$elem]),t>=this.maximumItem||-1===t?t=this.maximumItem:0>=t&&(t=0),this.swapSpeed(0),!0===this.browser.support3d?this.transition3d(this.positionsInArray[t]):this.css2slide(this.positionsInArray[t],1),this.currentItem=this.owl.currentItem=t,this.afterGo()},afterGo:function(){this.prevArr.push(this.currentItem),this.prevItem=this.owl.prevItem=this.prevArr[this.prevArr.length-2],this.prevArr.shift(0),this.prevItem!==this.currentItem&&(this.checkPagination(),this.checkNavigation(),this.eachMoveUpdate(),!1!==this.options.autoPlay&&this.checkAp()),"function"==typeof this.options.afterMove&&this.prevItem!==this.currentItem&&this.options.afterMove.apply(this,[this.$elem])},stop:function(){this.apStatus="stop",i.clearInterval(this.autoPlayInterval)},checkAp:function(){"stop"!==this.apStatus&&this.play()},play:function(){var t=this;return t.apStatus="play",!1===t.options.autoPlay?!1:(i.clearInterval(t.autoPlayInterval),void(t.autoPlayInterval=i.setInterval(function(){t.next(!0)},t.options.autoPlay)))},swapSpeed:function(t){"slideSpeed"===t?this.$owlWrapper.css(this.addCssSpeed(this.options.slideSpeed)):"paginationSpeed"===t?this.$owlWrapper.css(this.addCssSpeed(this.options.paginationSpeed)):"string"!=typeof t&&this.$owlWrapper.css(this.addCssSpeed(t))},addCssSpeed:function(t){return{"-webkit-transition":"all "+t+"ms ease","-moz-transition":"all "+t+"ms ease","-o-transition":"all "+t+"ms ease",transition:"all "+t+"ms ease"}},removeTransition:function(){return{"-webkit-transition":"","-moz-transition":"","-o-transition":"",transition:""}},doTranslate:function(t){return{"-webkit-transform":"translate3d("+t+"px, 0px, 0px)","-moz-transform":"translate3d("+t+"px, 0px, 0px)","-o-transform":"translate3d("+t+"px, 0px, 0px)","-ms-transform":"translate3d("+t+"px, 0px, 0px)",transform:"translate3d("+t+"px, 0px,0px)"}},transition3d:function(t){this.$owlWrapper.css(this.doTranslate(t))},css2move:function(t){this.$owlWrapper.css({left:t})},css2slide:function(t,i){var s=this;s.isCssFinish=!1,s.$owlWrapper.stop(!0,!0).animate({left:t},{duration:i||s.options.slideSpeed,complete:function(){s.isCssFinish=!0}})},checkBrowser:function(){var t=s.createElement("div");t.style.cssText="  -moz-transform:translate3d(0px, 0px, 0px); -ms-transform:translate3d(0px, 0px, 0px); -o-transform:translate3d(0px, 0px, 0px); -webkit-transform:translate3d(0px, 0px, 0px); transform:translate3d(0px, 0px, 0px)",t=t.style.cssText.match(/translate3d\(0px, 0px, 0px\)/g),this.browser={support3d:null!==t&&1===t.length,isTouch:"ontouchstart"in i||i.navigator.msMaxTouchPoints}},moveEvents:function(){(!1!==this.options.mouseDrag||!1!==this.options.touchDrag)&&(this.gestures(),this.disabledEvents())},eventTypes:function(){var t=["s","e","x"];this.ev_types={},!0===this.options.mouseDrag&&!0===this.options.touchDrag?t=["touchstart.owl mousedown.owl","touchmove.owl mousemove.owl","touchend.owl touchcancel.owl mouseup.owl"]:!1===this.options.mouseDrag&&!0===this.options.touchDrag?t=["touchstart.owl","touchmove.owl","touchend.owl touchcancel.owl"]:!0===this.options.mouseDrag&&!1===this.options.touchDrag&&(t=["mousedown.owl","mousemove.owl","mouseup.owl"]),this.ev_types.start=t[0],this.ev_types.move=t[1],this.ev_types.end=t[2]},disabledEvents:function(){this.$elem.on("dragstart.owl",function(t){t.preventDefault()}),this.$elem.on("mousedown.disableTextSelect",function(i){return t(i.target).is("input, textarea, select, option")})},gestures:function(){function e(t){if(void 0!==t.touches)return{x:t.touches[0].pageX,y:t.touches[0].pageY};if(void 0===t.touches){if(void 0!==t.pageX)return{x:t.pageX,y:t.pageY};if(void 0===t.pageX)return{x:t.clientX,y:t.clientY}}}function o(i){"on"===i?(t(s).on(r.ev_types.move,n),t(s).on(r.ev_types.end,a)):"off"===i&&(t(s).off(r.ev_types.move),t(s).off(r.ev_types.end))}function n(o){o=o.originalEvent||o||i.event,r.newPosX=e(o).x-l.offsetX,r.newPosY=e(o).y-l.offsetY,r.newRelativeX=r.newPosX-l.relativePos,"function"==typeof r.options.startDragging&&!0!==l.dragging&&0!==r.newRelativeX&&(l.dragging=!0,r.options.startDragging.apply(r,[r.$elem])),(8<r.newRelativeX||-8>r.newRelativeX)&&!0===r.browser.isTouch&&(void 0!==o.preventDefault?o.preventDefault():o.returnValue=!1,l.sliding=!0),(10<r.newPosY||-10>r.newPosY)&&!1===l.sliding&&t(s).off("touchmove.owl"),r.newPosX=Math.max(Math.min(r.newPosX,r.newRelativeX/5),r.maximumPixels+r.newRelativeX/5),!0===r.browser.support3d?r.transition3d(r.newPosX):r.css2move(r.newPosX)}function a(s){s=s.originalEvent||s||i.event;var e;s.target=s.target||s.srcElement,l.dragging=!1,!0!==r.browser.isTouch&&r.$owlWrapper.removeClass("grabbing"),r.dragDirection=r.owl.dragDirection=0>r.newRelativeX?"left":"right",0!==r.newRelativeX&&(e=r.getNewPosition(),r.goTo(e,!1,"drag"),l.targetElement===s.target&&!0!==r.browser.isTouch&&(t(s.target).on("click.disable",function(i){i.stopImmediatePropagation(),i.stopPropagation(),i.preventDefault(),t(i.target).off("click.disable")}),s=t._data(s.target,"events").click,e=s.pop(),s.splice(0,0,e))),o("off")}var r=this,l={offsetX:0,offsetY:0,baseElWidth:0,relativePos:0,position:null,minSwipe:null,maxSwipe:null,sliding:null,dargging:null,targetElement:null};r.isCssFinish=!0,r.$elem.on(r.ev_types.start,".owl-wrapper",function(s){s=s.originalEvent||s||i.event;var n;if(3===s.which)return!1;if(!(r.itemsAmount<=r.options.items)){if(!1===r.isCssFinish&&!r.options.dragBeforeAnimFinish||!1===r.isCss3Finish&&!r.options.dragBeforeAnimFinish)return!1;!1!==r.options.autoPlay&&i.clearInterval(r.autoPlayInterval),!0===r.browser.isTouch||r.$owlWrapper.hasClass("grabbing")||r.$owlWrapper.addClass("grabbing"),r.newPosX=0,r.newRelativeX=0,t(this).css(r.removeTransition()),n=t(this).position(),l.relativePos=n.left,l.offsetX=e(s).x-n.left,l.offsetY=e(s).y-n.top,o("on"),l.sliding=!1,l.targetElement=s.target||s.srcElement}})},getNewPosition:function(){var t=this.closestItem();return t>this.maximumItem?t=this.currentItem=this.maximumItem:0<=this.newPosX&&(this.currentItem=t=0),t},closestItem:function(){var i=this,s=!0===i.options.scrollPerPage?i.pagesInArray:i.positionsInArray,e=i.newPosX,o=null;return t.each(s,function(n,a){e-i.itemWidth/20>s[n+1]&&e-i.itemWidth/20<a&&"left"===i.moveDirection()?(o=a,i.currentItem=!0===i.options.scrollPerPage?t.inArray(o,i.positionsInArray):n):e+i.itemWidth/20<a&&e+i.itemWidth/20>(s[n+1]||s[n]-i.itemWidth)&&"right"===i.moveDirection()&&(!0===i.options.scrollPerPage?(o=s[n+1]||s[s.length-1],i.currentItem=t.inArray(o,i.positionsInArray)):(o=s[n+1],i.currentItem=n+1))}),i.currentItem},moveDirection:function(){var t;return 0>this.newRelativeX?(t="right",this.playDirection="next"):(t="left",this.playDirection="prev"),t},customEvents:function(){var t=this;t.$elem.on("owl.next",function(){t.next()}),t.$elem.on("owl.prev",function(){t.prev()}),t.$elem.on("owl.play",function(i,s){t.options.autoPlay=s,t.play(),t.hoverStatus="play"}),t.$elem.on("owl.stop",function(){t.stop(),t.hoverStatus="stop"}),t.$elem.on("owl.goTo",function(i,s){t.goTo(s)}),t.$elem.on("owl.jumpTo",function(i,s){t.jumpTo(s)})},stopOnHover:function(){var t=this;!0===t.options.stopOnHover&&!0!==t.browser.isTouch&&!1!==t.options.autoPlay&&(t.$elem.on("mouseover",function(){t.stop()}),t.$elem.on("mouseout",function(){"stop"!==t.hoverStatus&&t.play()}))},lazyLoad:function(){var i,s,e,o,n;if(!1===this.options.lazyLoad)return!1;for(i=0;i<this.itemsAmount;i+=1)s=t(this.$owlItems[i]),"loaded"!==s.data("owl-loaded")&&(e=s.data("owl-item"),o=s.find(".lazyOwl"),"string"!=typeof o.data("src")?s.data("owl-loaded","loaded"):(void 0===s.data("owl-loaded")&&(o.hide(),s.addClass("loading").data("owl-loaded","checked")),(n=!0===this.options.lazyFollow?e>=this.currentItem:!0)&&e<this.currentItem+this.options.items&&o.length&&this.lazyPreload(s,o)))},lazyPreload:function(t,s){function e(){t.data("owl-loaded","loaded").removeClass("loading"),s.removeAttr("data-src"),"fade"===a.options.lazyEffect?s.fadeIn(400):s.show(),"function"==typeof a.options.afterLazyLoad&&a.options.afterLazyLoad.apply(this,[a.$elem])}function o(){r+=1,a.completeImg(s.get(0))||!0===n?e():100>=r?i.setTimeout(o,100):e()}var n,a=this,r=0;"DIV"===s.prop("tagName")?(s.css("background-image","url("+s.data("src")+")"),n=!0):s[0].src=s.data("src"),o()},autoHeight:function(){function s(){var s=t(n.$owlItems[n.currentItem]).height();n.wrapperOuter.css("height",s+"px"),n.wrapperOuter.hasClass("autoHeight")||i.setTimeout(function(){n.wrapperOuter.addClass("autoHeight")},0)}function e(){o+=1,n.completeImg(a.get(0))?s():100>=o?i.setTimeout(e,100):n.wrapperOuter.css("height","")}var o,n=this,a=t(n.$owlItems[n.currentItem]).find("img");void 0!==a.get(0)?(o=0,e()):s()},completeImg:function(t){return!t.complete||"undefined"!=typeof t.naturalWidth&&0===t.naturalWidth?!1:!0},onVisibleItems:function(){var i;for(!0===this.options.addClassActive&&this.$owlItems.removeClass("active"),this.visibleItems=[],i=this.currentItem;i<this.currentItem+this.options.items;i+=1)this.visibleItems.push(i),!0===this.options.addClassActive&&t(this.$owlItems[i]).addClass("active");this.owl.visibleItems=this.visibleItems},transitionTypes:function(t){this.outClass="owl-"+t+"-out",this.inClass="owl-"+t+"-in"},singleItemTransition:function(){var t=this,i=t.outClass,s=t.inClass,e=t.$owlItems.eq(t.currentItem),o=t.$owlItems.eq(t.prevItem),n=Math.abs(t.positionsInArray[t.currentItem])+t.positionsInArray[t.prevItem],a=Math.abs(t.positionsInArray[t.currentItem])+t.itemWidth/2;t.isTransition=!0,t.$owlWrapper.addClass("owl-origin").css({"-webkit-transform-origin":a+"px","-moz-perspective-origin":a+"px","perspective-origin":a+"px"}),o.css({position:"relative",left:n+"px"}).addClass(i).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend",function(){t.endPrev=!0,o.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend"),t.clearTransStyle(o,i)}),e.addClass(s).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend",function(){t.endCurrent=!0,e.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend"),t.clearTransStyle(e,s)})},clearTransStyle:function(t,i){t.css({position:"",left:""}).removeClass(i),this.endPrev&&this.endCurrent&&(this.$owlWrapper.removeClass("owl-origin"),this.isTransition=this.endCurrent=this.endPrev=!1)},owlStatus:function(){this.owl={userOptions:this.userOptions,baseElement:this.$elem,userItems:this.$userItems,owlItems:this.$owlItems,currentItem:this.currentItem,prevItem:this.prevItem,visibleItems:this.visibleItems,isTouch:this.browser.isTouch,browser:this.browser,dragDirection:this.dragDirection}},clearEvents:function(){this.$elem.off(".owl owl mousedown.disableTextSelect"),t(s).off(".owl owl"),t(i).off("resize",this.resizer)},unWrap:function(){0!==this.$elem.children().length&&(this.$owlWrapper.unwrap(),this.$userItems.unwrap().unwrap(),this.owlControls&&this.owlControls.remove()),this.clearEvents(),this.$elem.attr("style",this.$elem.data("owl-originalStyles")||"").attr("class",this.$elem.data("owl-originalClasses"))},destroy:function(){this.stop(),i.clearInterval(this.checkVisible),this.unWrap(),this.$elem.removeData()},reinit:function(i){i=t.extend({},this.userOptions,i),this.unWrap(),this.init(i,this.$elem)},addItem:function(t,i){var s;return t?0===this.$elem.children().length?(this.$elem.append(t),this.setVars(),!1):(this.unWrap(),s=void 0===i||-1===i?-1:i,s>=this.$userItems.length||-1===s?this.$userItems.eq(-1).after(t):this.$userItems.eq(s).before(t),void this.setVars()):!1},removeItem:function(t){return 0===this.$elem.children().length?!1:(t=void 0===t||-1===t?-1:t,this.unWrap(),this.$userItems.eq(t).remove(),void this.setVars())}};t.fn.owlCarousel=function(i){return this.each(function(){if(!0===t(this).data("owl-init"))return!1;t(this).data("owl-init",!0);var s=Object.create(e);s.init(i,this),t.data(this,"owlCarousel",s)})},t.fn.owlCarousel.options={items:5,itemsCustom:!1,itemsDesktop:[1199,4],itemsDesktopSmall:[979,3],itemsTablet:[768,2],itemsTabletSmall:!1,itemsMobile:[479,1],singleItem:!1,itemsScaleUp:!1,slideSpeed:200,paginationSpeed:800,rewindSpeed:1e3,autoPlay:!1,stopOnHover:!1,navigation:!1,navigationText:["prev","next"],rewindNav:!0,scrollPerPage:!1,pagination:!0,paginationNumbers:!1,responsive:!0,responsiveRefreshRate:200,responsiveBaseWidth:i,baseClass:"owl-carousel",theme:"owl-theme",lazyLoad:!1,lazyFollow:!0,lazyEffect:"fade",autoHeight:!1,jsonPath:!1,jsonSuccess:!1,dragBeforeAnimFinish:!0,mouseDrag:!0,touchDrag:!0,addClassActive:!1,transitionStyle:!1,beforeUpdate:!1,afterUpdate:!1,beforeInit:!1,afterInit:!1,beforeMove:!1,afterMove:!1,afterAction:!1,startDragging:!1,afterLazyLoad:!1}}(jQuery,window,document);

/*LAZYR*/    
    !function(t,e){"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?module.exports=e():t.Layzr=e()}(this,function(){"use strict";function t(t){this._lastScroll=0,this._ticking=!1,this._optionsSelector=t.selector||"[data-layzr]",this._optionsAttr=t.attr||"data-layzr",this._optionsAttrRetina=t.retinaAttr||"data-layzr-retina",this._optionsAttrBg=t.bgAttr||"data-layzr-bg",this._optionsThreshold=t.threshold||0,this._optionsCallback=t.callback||null,this._retina=window.devicePixelRatio>1,this._srcAttr=this._retina?this._optionsAttrRetina:this._optionsAttr,this._nodes=document.querySelectorAll(this._optionsSelector),this._create()}return t.prototype._requestScroll=function(){this._lastScroll=window.scrollY||window.pageYOffset,this._requestTick()},t.prototype._requestTick=function(){this._ticking||(requestAnimationFrame(this.update.bind(this)),this._ticking=!0)},t.prototype._getOffset=function(t){var e=0;do isNaN(t.offsetTop)||(e+=t.offsetTop);while(t=t.offsetParent);return e},t.prototype._create=function(){this._requestScroll(),window.addEventListener("scroll",this._requestScroll.bind(this),!1),window.addEventListener("resize",this._requestScroll.bind(this),!1)},t.prototype._destroy=function(){window.removeEventListener("scroll",this._requestScroll.bind(this),!1),window.removeEventListener("resize",this._requestScroll.bind(this),!1)},t.prototype._inViewport=function(t){var e=this._lastScroll,i=e+window.innerHeight,o=this._getOffset(t),s=o+t.offsetHeight,r=this._optionsThreshold/100*window.innerHeight;return s>=e-r&&i+r>=s},t.prototype._reveal=function(t){var e=t.getAttribute(this._srcAttr)||t.getAttribute(this._optionsAttr);t.hasAttribute(this._optionsAttrBg)?t.style.backgroundImage="url("+e+")":t.setAttribute("src",e),"function"==typeof this._optionsCallback&&this._optionsCallback.call(t),t.removeAttribute(this._optionsAttr),t.removeAttribute(this._optionsAttrRetina),t.removeAttribute(this._optionsAttrBg)},t.prototype.updateSelector=function(){this._nodes=document.querySelectorAll(this._optionsSelector)},t.prototype.update=function(){for(var t=this._nodes.length,e=0;t>e;e++){var i=this._nodes[e];i.hasAttribute(this._optionsAttr)&&this._inViewport(i)&&this._reveal(i)}this._ticking=!1},t});

/*! hoverIntent v1.8.0 // 2014.06.29 // jQuery v1.9.1+ */
    (function($){$.fn.hoverIntent=function(handlerIn,handlerOut,selector){var cfg={interval:100,sensitivity:6,timeout:0};if(typeof handlerIn==="object"){cfg=$.extend(cfg,handlerIn)}else{if($.isFunction(handlerOut)){cfg=$.extend(cfg,{over:handlerIn,out:handlerOut,selector:selector})}else{cfg=$.extend(cfg,{over:handlerIn,out:handlerIn,selector:handlerOut})}}var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if(Math.sqrt((pX-cX)*(pX-cX)+(pY-cY)*(pY-cY))<cfg.sensitivity){$(ob).off("mousemove.hoverIntent",track);ob.hoverIntent_s=true;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=false;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=$.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type==="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).on("mousemove.hoverIntent",track);if(!ob.hoverIntent_s){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).off("mousemove.hoverIntent",track);if(ob.hoverIntent_s){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.on({"mouseenter.hoverIntent":handleHover,"mouseleave.hoverIntent":handleHover},cfg.selector)}})(jQuery);

/*!Zoom 1.7.13 - http://www.jacklmoore.com/zoom*/	
    (function(o){var t={url:!1,callback:!1,target:!1,duration:120,on:"mouseover",touch:!0,onZoomIn:!1,onZoomOut:!1,magnify:1};o.zoom=function(t,n,e,i){var u,c,a,m,l,r,s,f=o(t).css("position"),h=o(n);return t.style.position=/(absolute|fixed)/.test(f)?f:"relative",t.style.overflow="hidden",e.style.width=e.style.height="",o(e).addClass("zoomImg").css({position:"absolute",top:0,left:0,opacity:0,width:e.width*i,height:e.height*i,border:"none",maxWidth:"none",maxHeight:"none"}).appendTo(t),{init:function(){c=o(t).outerWidth(),u=o(t).outerHeight(),n===t?(m=c,a=u):(m=h.outerWidth(),a=h.outerHeight()),l=(e.width-c)/m,r=(e.height-u)/a,s=h.offset()},move:function(o){var t=o.pageX-s.left,n=o.pageY-s.top;n=Math.max(Math.min(n,a),0),t=Math.max(Math.min(t,m),0),e.style.left=t*-l+"px",e.style.top=n*-r+"px"}}},o.fn.zoom=function(n){return this.each(function(){var e,i=o.extend({},t,n||{}),u=i.target||this,c=this,a=o(c),m=document.createElement("img"),l=o(m),r="mousemove.zoom",s=!1,f=!1;(i.url||(e=a.find("img"),e[0]&&(i.url=e.data("src")||e.attr("src")),i.url))&&(function(){var o=u.style.position,t=u.style.overflow;a.one("zoom.destroy",function(){a.off(".zoom"),u.style.position=o,u.style.overflow=t,l.remove()})}(),m.onload=function(){function t(t){e.init(),e.move(t),l.stop().fadeTo(o.support.opacity?i.duration:0,1,o.isFunction(i.onZoomIn)?i.onZoomIn.call(m):!1)}function n(){l.stop().fadeTo(i.duration,0,o.isFunction(i.onZoomOut)?i.onZoomOut.call(m):!1)}var e=o.zoom(u,c,m,i.magnify);"grab"===i.on?a.on("mousedown.zoom",function(i){1===i.which&&(o(document).one("mouseup.zoom",function(){n(),o(document).off(r,e.move)}),t(i),o(document).on(r,e.move),i.preventDefault())}):"click"===i.on?a.on("click.zoom",function(i){return s?void 0:(s=!0,t(i),o(document).on(r,e.move),o(document).one("click.zoom",function(){n(),s=!1,o(document).off(r,e.move)}),!1)}):"toggle"===i.on?a.on("click.zoom",function(o){s?n():t(o),s=!s}):"mouseover"===i.on&&(e.init(),a.on("mouseenter.zoom",t).on("mouseleave.zoom",n).on(r,e.move)),i.touch&&a.on("touchstart.zoom",function(o){o.preventDefault(),f?(f=!1,n()):(f=!0,t(o.originalEvent.touches[0]||o.originalEvent.changedTouches[0]))}).on("touchmove.zoom",function(o){o.preventDefault(),e.move(o.originalEvent.touches[0]||o.originalEvent.changedTouches[0])}),o.isFunction(i.callback)&&i.callback.call(m)},m.src=i.url)})},o.fn.zoom.defaults=t})(window.jQuery);

/*MOUSEWELL*/
    (function(a){function d(b){var c=b||window.event,d=[].slice.call(arguments,1),e=0,f=!0,g=0,h=0;return b=a.event.fix(c),b.type="mousewheel",c.wheelDelta&&(e=c.wheelDelta/120),c.detail&&(e=-c.detail/3),h=e,c.axis!==undefined&&c.axis===c.HORIZONTAL_AXIS&&(h=0,g=-1*e),c.wheelDeltaY!==undefined&&(h=c.wheelDeltaY/120),c.wheelDeltaX!==undefined&&(g=-1*c.wheelDeltaX/120),d.unshift(b,e,g,h),(a.event.dispatch||a.event.handle).apply(this,d)}var b=["DOMMouseScroll","mousewheel"];if(a.event.fixHooks)for(var c=b.length;c;)a.event.fixHooks[b[--c]]=a.event.mouseHooks;a.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var a=b.length;a;)this.addEventListener(b[--a],d,!1);else this.onmousewheel=d},teardown:function(){if(this.removeEventListener)for(var a=b.length;a;)this.removeEventListener(b[--a],d,!1);else this.onmousewheel=null}},a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})})(jQuery);

/*UI SLIDER*/
    !function(e){ulslide_last_id=0,e.fn.ulslide=function(t){function i(e,i){if(e>=t.effect.showCount-i){var n=t.count-t.effect.showCount,a=e+i-t.effect.showCount-n;return a}return e+i}function n(){var e=u.uslCurrent();t.direction="f",u.uslRefresh(e+1<t.count?e+1:0)}function a(){var e=u.uslCurrent();t.direction="b",u.uslRefresh(e>0?e-1:t.count-1)}function o(i){var n=e(i);n.each(function(t){this.usl_navigator_index=t,e(this).addClass("usl-pager-"+t)}),n.click(function(){var e=this.usl_navigator_index;return e<t.count&&e!=u.uslCurrent()&&(t.direction=e>u.uslCurrent()?"f":"b",u.uslRefresh(e)),!1})}function s(e){e?r.addClass("usl-loading"):r.removeClass("usl-loading")}var r=this;if(0==r.length)return!1;var u=r[0];e(u).attr("id")||(ulslide_last_id++,e(u).attr("id","ulslide-"+ulslide_last_id));e(u).attr("id");t=e.extend({effect:{type:"slide",axis:"x",distance:20},duration:600,direction:"f",autoslide:!1,current:0,width:r.width(),height:"auto",statusbar:!0,loadTimeout:6e3,lazyload:!1,ajax:!1,mousewheel:!1,pager:!1,nextButton:!1,prevButton:!1,printCurrentTo:!1,onAnimateStart:function(){},onAnimate:function(){},onAjaxStart:function(){},onAjaxStop:function(){},debug:!1},t),"undefined"!=typeof t.affect&&(t.effect.type=t.affect),"undefined"!=typeof t.axis&&(t.effect.axis=t.axis),"undefined"!=typeof t.padding&&(t.effect.distance=t.padding),"undefined"!=typeof t.navigator&&(t.pager=t.navigator),"undefined"!=typeof t.print_current&&(t.printCurrentTo=t.print_current),"undefined"!=typeof t.bnext&&(t.nextButton=t.bnext),"undefined"!=typeof t.bprev&&(t.prevButton=t.bprev),"undefined"==typeof t.effect.distance&&(t.effect.distance=20),t.fwidth=t.width+t.effect.distance,t.fheight=t.height+t.effect.distance,t.prev=t.current,t.count=e("> *",r).length,t.lazyload&&e("img",r).each(function(t){var i=e(this);i.attr("rel",i.attr("src")),t>0&&i.removeAttr("src")}),e("> *",r).each(function(n){var a=e(this);if(a.addClass("slide-node slide-node-"+n),a.css("position","absolute"),a.css("margin","0"),a.css("distance","0"),a.css("width",t.width),a.css("overflow","hidden"),"carousel"==t.effect.type){var o=i(n,t.current);"y"==t.effect.axis?(a.css("top",o*t.fheight),a.css("left","0")):(a.css("top","0"),a.css("left",o*t.fwidth))}else n==t.current?(a.css("top","0"),a.css("left","0")):(a.css("top","0"),a.css("left",-(t.width+t.effect.distance)))}),r.css("list-style","none"),r.css("distance","0"),r.css("position","relative"),r.css("padding",0),"rotate"!=t.effect.type&&r.css("overflow","hidden"),"carousel"==t.effect.type?"y"==t.effect.axis?(r.css("width",t.width),r.css("height",t.fheight*t.effect.showCount-t.effect.distance)):(r.css("width",t.fwidth*t.effect.showCount-t.effect.distance),r.css("height",t.height)):(r.css("width",t.width),"auto"==t.height?r.css("height",e("> *:eq("+t.current+")",r).height()):r.css("height",t.height)),t.prevHeight=t.height,u.getSlide=function(t){return e("> *:eq("+t+")",u)},u.currentHeight="auto"==t.height?u.getSlide(t.current).height():t.height,u.uslCurrent=function(e){if(void 0==e)return t.current;u.uslCurrent();return t.current=e,e},u.autoslideNext=function(){"f"==t.direction?n():a()},u.initAutoslide=function(){t.TimeoutID&&clearTimeout(t.TimeoutID),t.TimeoutID=setTimeout("jQuery('#"+e(u).attr("id")+"')[0].autoslideNext()",t.autoslide),t.debug&&console.log("initAutoslide: "+t.TimeoutID)},u.clearAutoslide=function(){t.TimeoutID&&clearTimeout(t.TimeoutID)},u.uslRefresh=function(n,a,o){function s(){function n(){t.debug&&console.log("finish_animate(): start"),t.printCurrentTo&&e(t.printCurrentTo).html(t.current+1),t.prev!=t.current&&"carousel"!=t.effect.type&&c.css("display","none"),"auto"==t.height&&r.animate({height:u.currentHeight},250),t.debug&&console.log("finish_animate(): autoslide = "+t.autoslide),t.autoslide&&u.initAutoslide(),t.onAnimate(t,u),t.prev=t.current,u.uslRefreshClasses(),u.ready=!0,"undefined"!=typeof o&&o()}if(t.debug&&console.log("doRefresh()"),t.onAnimateStart(t,u),"auto"==t.height&&(u.currentHeight=u.getSlide(t.current).height(),t.prevHeight=u.getSlide(t.prev).height()),t.prev==t.current)return void n();if("slide"==t.effect.type)"x"==t.effect.axis?(t.prev!=t.current&&("f"==t.direction?(c.animate({left:-(t.width+t.effect.distance)},t.duration,t.easing),d.css("left",t.width+t.effect.distance)):(c.animate({left:t.width+t.effect.distance},t.duration,t.easing),d.css("left",-(t.width+t.effect.distance)))),d.animate({left:0},t.duration,t.easing,function(){n()})):(t.prev!=t.current&&("f"==t.direction?(c.animate({top:u.currentHeight+t.effect.distance},t.duration,t.easing,function(){c.css("left",-(t.width+t.effect.distance))}),d.css("top",-(t.prevHeight+t.effect.distance))):(c.animate({top:-(u.currentHeight+t.effect.distance)},t.duration,t.easing,function(){c.css("left",-(t.width+t.effect.distance))}),d.css("top",t.prevHeight+t.effect.distance))),d.css("left",0),d.animate({top:0},t.duration,t.easing,function(){n()}));else if("fade"==t.effect.type){d.css("display","none"),d.css("left",0),d.css("top",0);var s=t.duration;"undefined"!=typeof a&&(s=0),c.fadeOut(s,function(){c.css("display","none"),d.fadeIn(s,function(){n()})})}else if("rotate"==t.effect.type){var f="f"==t.direction?"-":"";d.animate({rotate:f+"90deg",scale:"0.01",opacity:.3,"z-index":2,left:0,top:0},0),c.css("z-index",1),c.animate({opacity:0},t.duration,t.easing,function(){}),d.animate({rotate:f+"360deg",scale:"1",opacity:1},t.duration,t.easing,function(){n()})}else if("scale"==t.effect.type){if("f"==t.direction)var f="-",l="";else var f="",l="-";d.animate({scale:"0.05",opacity:.3,"z-index":2,left:0,top:0,marginLeft:l+t.fwidth/2+"px"},0),c.css("z-index",1),c.animate({scale:"0.01",opacity:0,marginLeft:f+t.fwidth/2+"px"},t.duration,t.easing,function(){}),d.animate({scale:"1",opacity:1,marginLeft:"0px"},t.duration,t.easing,function(){n()})}else"carousel"==t.effect.type&&e("> *",r).each(function(a){liel=e(this);var o=i(a,t.current);if("f"==t.direction)var s=i(a,t.current-1);else var s=i(a,t.current+1);"y"==t.effect.axis?"f"==t.direction&&0==o?(liel.css("top",-1*t.fheight),liel.animate({top:o*t.fheight},t.duration,t.easing)):"f"==t.direction&&s+1==t.effect.showCount?liel.animate({top:t.effect.showCount*t.fheight},t.duration,t.easing):"b"==t.direction&&0==s?liel.animate({top:-1*t.fheight},t.duration,t.easing):"b"==t.direction&&o+1==t.effect.showCount?(liel.css("top",(o+1)*t.fheight),liel.animate({top:o*t.fheight},t.duration,t.easing)):o<t.effect.showCount&&o>=0?liel.animate({top:o*t.fheight},t.duration,t.easing):liel.css("top",o*t.fheight):"f"==t.direction&&0==o?(liel.css("left",-1*t.fwidth),liel.animate({left:o*t.fwidth},t.duration,t.easing)):"f"==t.direction&&s+1==t.effect.showCount?liel.animate({left:t.effect.showCount*t.fwidth},t.duration,t.easing):"b"==t.direction&&0==s?liel.animate({left:-1*t.fwidth},t.duration,t.easing):"b"==t.direction&&o+1==t.effect.showCount?(liel.css("left",(o+1)*t.fwidth),liel.animate({left:o*t.fwidth},t.duration,t.easing)):o<t.effect.showCount&&o>=0?liel.animate({left:o*t.fwidth},t.duration,t.easing):liel.css("left",o*t.fwidth),setTimeout(function(){n()},t.duration+100)})}if(t.debug&&console.log("uslRefresh()"),!u.ready)return t.debug&&console.log("uslRefresh / "+t.id+": ! thisEl.ready"),void setTimeout("jQuery('#"+e(u).attr("id")+"')[0].uslRefresh()",400);t.LoadTimeoutID&&clearTimeout(t.LoadTimeoutID),u.ready=!1,"undefined"!=typeof n&&u.uslCurrent(n),u.clearAutoslide();var c=u.getSlide(t.prev),d=u.getSlide(t.current);if(d.css("display","block"),t.ajax){t.onAjaxStart(t,u);{u.getSlide(t.current)[0].usl_ajax_loaded}u.uslAjaxLoadSlide(t.current,function(){t.onAjaxStop(t,u),s()})}else{if(t.lazyload){var f=e("img",d[0]);return f.each(function(){var t=e(this);t.attr("src",t.attr("rel"))}),t.z_img_count=f.length,t.z_img_loaded=0,f.each(function(){this.complete?t.z_img_loaded++:e(this).load(function(){t.z_img_loaded++,t.z_img_loaded==t.z_img_count&&s()})}),void(t.z_img_loaded==t.z_img_count&&s())}s()}},u.uslAjaxLoadSlide=function(i,n){var a=u.getSlide(i);if(a[0].usl_ajax_loaded)n();else{var o=e(t.pager).eq(i).attr("href");a[0].usl_ajax_loaded=!0,a.load(o+"?ajax=1",!1,n)}},u.uslRefreshClasses=function(){t.count>1&&(t.nextButton&&e(t.nextButton).addClass("active"),t.prevButton&&e(t.prevButton).addClass("active")),t.pager&&(e(t.pager).removeClass("usl-current"),e(t.pager+".usl-pager-"+u.uslCurrent()).addClass("usl-current"),e(t.pager).parent().removeClass("usl-current-parent"),e(t.pager+".usl-pager-"+u.uslCurrent()).parent().addClass("usl-current-parent"))},t.nextButton&&e(t.nextButton).click(function(){return n(),!1}),t.prevButton&&e(t.prevButton).click(function(){return a(),!1}),t.pager&&o(t.pager),t.navigator2&&o(t.navigator2),u.uslStatusbar=function(){function i(e){return e.complete?"undefined"!=typeof e.naturalWidth&&0===e.naturalWidth?!1:!0:!1}if(t.lazyload)var n=e(">li:eq("+t.current+") img",u);else var n=e("img",u);t.img_count=n.length,t.img_count&&s(!0),t.img_loaded=0,n.each(function(){i(this)?(t.img_loaded++,t.debug&&console.log(e(this).attr("src")+" loaded")):(e(this).load(function(){t.img_loaded++,t.debug&&console.log("Img LOAD / "+t.img_loaded+" of "+t.img_count),t.img_loaded==t.img_count&&(s(!1),u.ready=!0,u.uslRefresh())}),t.debug&&console.log(e(this).attr("src")+" NOT loaded"))}),t.debug&&console.log("uslStatusbar() / "+t.img_loaded+" of "+t.img_count),t.img_loaded==t.img_count&&(s(!1),u.ready=!0,u.uslRefresh()),t.LoadTimeoutID=setTimeout(function(){s(!1),u.ready=!0,u.uslRefresh()},t.loadTimeout)},t.statusbar&&!t.ajax&&u.uslStatusbar(),t.mousewheel&&r.bind("mousewheel",function(e,t){return u.ready&&(0>t?n():a()),!1}),(!t.statusbar||t.ajax)&&(u.ready=!0,u.uslRefresh())}}(jQuery);

/*!* Bootstrap v3.3.1 (http://getbootstrap.com) */
    /*if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.1",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a(f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.1",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")&&(c.prop("checked")&&this.$element.hasClass("active")?a=!1:b.find(".active").removeClass("active")),a&&c.prop("checked",!this.$element.hasClass("active")).trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active"));a&&this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),c.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=this.sliding=this.interval=this.$active=this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.1",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c="prev"==a?-1:1,d=this.getItemIndex(b),e=(d+c)%this.$items.length;return this.$items.eq(e)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));return a>this.$items.length-1||0>a?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){return this.sliding?void 0:this.slide("next")},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i="next"==b?"first":"last",j=this;if(!f.length){if(!this.options.wrap)return;f=this.$element.find(".item")[i]()}if(f.hasClass("active"))return this.sliding=!1;var k=f[0],l=a.Event("slide.bs.carousel",{relatedTarget:k,direction:h});if(this.$element.trigger(l),!l.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var m=a(this.$indicators.children()[this.getItemIndex(f)]);m&&m.addClass("active")}var n=a.Event("slid.bs.carousel",{relatedTarget:k,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),j.sliding=!1,setTimeout(function(){j.$element.trigger(n)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(n)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&"show"==b&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a(this.options.trigger).filter('[href="#'+b.id+'"], [data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.1",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0,trigger:'[data-toggle="collapse"]'},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.find("> .panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":a.extend({},e.data(),{trigger:this});c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){b&&3===b.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=c(d),f={relatedTarget:this};e.hasClass("open")&&(e.trigger(b=a.Event("hide.bs.dropdown",f)),b.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger("hidden.bs.dropdown",f)))}))}function c(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.1",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=c(e),g=f.hasClass("open");if(b(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",b);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger("shown.bs.dropdown",h)}return!1}},g.prototype.keydown=function(b){if(/(38|40|27|32)/.test(b.which)&&!/input|textarea/i.test(b.target.tagName)){var d=a(this);if(b.preventDefault(),b.stopPropagation(),!d.is(".disabled, :disabled")){var e=c(d),g=e.hasClass("open");if(!g&&27!=b.which||g&&27==b.which)return 27==b.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.divider):visible a",i=e.find('[role="menu"]'+h+', [role="listbox"]'+h);if(i.length){var j=i.index(b.target);38==b.which&&j>0&&j--,40==b.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",b).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="menu"]',g.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="listbox"]',g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$backdrop=this.isShown=null,this.scrollbarWidth=0,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.1",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.options.backdrop&&d.adjustBackdrop(),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in").attr("aria-hidden",!1),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$element.find(".modal-dialog").one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a('<div class="modal-backdrop '+e+'" />').prependTo(this.$element).on("click.dismiss.bs.modal",a.proxy(function(a){a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.options.backdrop&&this.adjustBackdrop(),this.adjustDialog()},c.prototype.adjustBackdrop=function(){this.$backdrop.css("height",0).css("height",this.$element[0].scrollHeight)},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){this.bodyIsOverflowing=document.body.scrollHeight>document.documentElement.clientHeight,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right","")},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b,g=f&&f.selector;(e||"destroy"!=b)&&(g?(e||d.data("bs.tooltip",e={}),e[g]||(e[g]=new c(this,f))):e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",a,b)};c.VERSION="3.3.1",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(this.options.viewport.selector||this.options.viewport);for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c&&c.$tip&&c.$tip.is(":visible")?void(c.hoverState="in"):(c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.options.container?a(this.options.container):this.$element.parent(),p=this.getPosition(o);h="bottom"==h&&k.bottom+m>p.bottom?"top":"top"==h&&k.top-m<p.top?"bottom":"right"==h&&k.right+l>p.width?"left":"left"==h&&k.left-l<p.left?"right":h,f.removeClass(n).addClass(h)}var q=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(q,h);var r=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",r).emulateTransitionEnd(c.TRANSITION_DURATION):r()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top=b.top+g,b.left=b.left+h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=this.tip(),g=a.Event("hide.bs."+this.type);return this.$element.trigger(g),g.isDefaultPrevented()?void 0:(f.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this)},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=d?{top:0,left:0}:b.offset(),g={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},h=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,g,h,f)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.width&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type)})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b,g=f&&f.selector;(e||"destroy"!=b)&&(g?(e||d.data("bs.popover",e={}),e[g]||(e[g]=new c(this,f))):e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.1",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},c.prototype.tip=function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){var e=a.proxy(this.process,this);this.$body=a("body"),this.$scrollElement=a(a(c).is("body")?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",e),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.1",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b="offset",c=0;a.isWindow(this.$scrollElement[0])||(b="position",c=this.$scrollElement.scrollTop()),this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight();var d=this;this.$body.find(this.selector).map(function(){var d=a(this),e=d.data("target")||d.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[b]().top+c,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){d.offsets.push(this[0]),d.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(!e[a+1]||b<=e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.1",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=this.unpin=this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.1",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return c>e?"top":!1;if("bottom"==this.affixed)return null!=c?e+this.unpin<=f.top?!1:"bottom":a-d>=e+g?!1:"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&c>=i?"top":null!=d&&i+j>=a-d?"bottom":!1},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=a("body").height();"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);*/


    /*!
 * @name        image-zoom
 * @author      Matt Hinchliffe <http://maketea.co.uk>
 * @modified    Monday, March 16th, 2015
 * @version     2.3.0
 */!function(a){"use strict";function b(b,c){this.$target=a(b),this.opts=a.extend({},i,c,this.$target.data()),void 0===this.isOpen&&this._init()}var c,d,e,f,g,h,i={loadingNotice:"Loading image",errorNotice:"The image could not be loaded",errorDuration:2500,preventClicks:!0,onShow:a.noop,onHide:a.noop,onMove:a.noop};b.prototype._init=function(){this.$link=this.$target.find("a"),this.$image=this.$target.find("img"),this.$flyout=a('<div class="easyzoom-flyout" />'),this.$notice=a('<div class="easyzoom-notice" />'),this.$target.on({"mousemove.easyzoom touchmove.easyzoom":a.proxy(this._onMove,this),"mouseleave.easyzoom touchend.easyzoom":a.proxy(this._onLeave,this),"mouseenter.easyzoom touchstart.easyzoom":a.proxy(this._onEnter,this)}),this.opts.preventClicks&&this.$target.on("click.easyzoom",function(a){a.preventDefault()})},b.prototype.show=function(a,b){var g,h,i,j,k=this;return this.isReady?(this.$target.append(this.$flyout),g=this.$target.width(),h=this.$target.height(),i=this.$flyout.width(),j=this.$flyout.height(),c=this.$zoom.width()-i,d=this.$zoom.height()-j,e=c/g,f=d/h,this.isOpen=!0,this.opts.onShow.call(this),void(a&&this._move(a))):this._loadImage(this.$link.attr("href"),function(){(k.isMouseOver||!b)&&k.show(a)})},b.prototype._onEnter=function(a){var b=a.originalEvent.touches;this.isMouseOver=!0,b&&1!=b.length||(a.preventDefault(),this.show(a,!0))},b.prototype._onMove=function(a){this.isOpen&&(a.preventDefault(),this._move(a))},b.prototype._onLeave=function(){this.isMouseOver=!1,this.isOpen&&this.hide()},b.prototype._onLoad=function(a){a.target.width&&(this.isReady=!0,this.$notice.detach(),this.$flyout.html(this.$zoom),this.$target.removeClass("is-loading").addClass("is-ready"),a.data.call&&a.data())},b.prototype._onError=function(){var a=this;this.$notice.text(this.opts.errorNotice),this.$target.removeClass("is-loading").addClass("is-error"),this.detachNotice=setTimeout(function(){a.$notice.detach(),a.detachNotice=null},this.opts.errorDuration)},b.prototype._loadImage=function(b,c){var d=new Image;this.$target.addClass("is-loading").append(this.$notice.text(this.opts.loadingNotice)),this.$zoom=a(d).on("error",a.proxy(this._onError,this)).on("load",c,a.proxy(this._onLoad,this)),d.style.position="absolute",d.src=b},b.prototype._move=function(a){if(0===a.type.indexOf("touch")){var b=a.touches||a.originalEvent.touches;g=b[0].pageX,h=b[0].pageY}else g=a.pageX||g,h=a.pageY||h;var i=this.$target.offset(),j=h-i.top,k=g-i.left,l=Math.ceil(j*f),m=Math.ceil(k*e);if(0>m||0>l||m>c||l>d)this.hide();else{var n=-1*l,o=-1*m;this.$zoom.css({top:n,left:o}),this.opts.onMove.call(this,n,o)}},b.prototype.hide=function(){this.isOpen&&(this.$flyout.detach(),this.isOpen=!1,this.opts.onHide.call(this))},b.prototype.swap=function(b,c,d){this.hide(),this.isReady=!1,this.detachNotice&&clearTimeout(this.detachNotice),this.$notice.parent().length&&this.$notice.detach(),this.$target.removeClass("is-loading is-ready is-error"),this.$image.attr({src:b,srcset:a.isArray(d)?d.join():d}),this.$link.attr("href",c)},b.prototype.teardown=function(){this.hide(),this.$target.off(".easyzoom").removeClass("is-loading is-ready is-error"),this.detachNotice&&clearTimeout(this.detachNotice),delete this.$link,delete this.$zoom,delete this.$image,delete this.$notice,delete this.$flyout,delete this.isOpen,delete this.isReady},a.fn.easyZoom=function(c){return this.each(function(){var d=a.data(this,"easyZoom");d?void 0===d.isOpen&&d._init():a.data(this,"easyZoom",new b(this,c))})},"function"==typeof define&&define.amd?define(function(){return b}):"undefined"!=typeof module&&module.exports&&(module.exports=b)}(jQuery);;$(document).ready(function() {
    DEFAULT.init();
});

var DEFAULT = {
    init: function() {
        $('<div class="fundo-busca" style="width:100%;height:100%;background:#05386c;opacity:0.8;position:fixed;top:0;left:0;z-index:1;display:none;"></div>').prependTo('body');        
        DEFAULT.hover_menu();
        DEFAULT.nav_mobile();
        DEFAULT.hover_menu_mobile();
        DEFAULT.menu_busca();
        DEFAULT.lazy_load();
        DEFAULT.busca();
        DEFAULT.assine_news();
        DEFAULT.scroll_menu();
        DEFAULT.carrinho();
        DEFAULT.drop_cart();        

        if($('body').hasClass('home'))
            HOME.init();

        if($('body').hasClass('departamento'))
            DEP.init();

        if($('body').hasClass('categoria'))
            CAT.init();

        if($('body').hasClass('busca'))
            BUSCA.init();

        if($('body').hasClass('produto'))
            PRODUTO.init();        
    },
    hover_menu: function() {

        $('.navegacao nav.menu-navegacao ul li a').click(function(){
            if( $(window).width() <= 768 || DEFAULT.verificaMobile() ) {
                if( !$(this).hasClass('firstClick') ) {
                    $(this).addClass('firstClick');
                    console.log( 'firstClick' );
                    return false;
                }
                else
                {
                    console.log( 'lastClick' );                    
                }
            }
        });

        $('.navegacao nav.menu-navegacao > ul > li').hoverIntent({
            sensitivity: 3, // number = sensitivity threshold (must be 1 or higher)
            interval: 60, // number = milliseconds of polling interval
            over: function() {
                $('.dropdown-navegacao', this).fadeIn(250, "easeOutExpo");
                $(this).find('>a').addClass('active');
            },
            timeout: 500,
            out: function() {
                $('.dropdown-navegacao', this).fadeOut(250, "easeOutExpo");
                $(this).find('>a').removeClass('active');
            }
        });

        $('.navegacao nav.menu-navegacao > ul > li ul.item-dropdown-02 > li').hoverIntent({
            sensitivity: 3, // number = sensitivity threshold (must be 1 or higher)
            interval: 60, // number = milliseconds of polling interval
            over: function() {
                HOME.left_menu = $('.dropdown-sub-nivel-03', this).css('left');                
                $('.dropdown-sub-nivel-03', this).css('left', '-'+HOME.left_menu).show();
                $('.dropdown-sub-nivel-03', this).animate({ left: HOME.left_menu }, 200, function(){
                    $(this).removeAttr('style');
                });

                $(this).find('>a').addClass('active');
            },
            timeout: 60,
            out: function() {
                $('.dropdown-sub-nivel-03', this).fadeOut(200, "easeOutExpo", function(){
                    $('.dropdown-sub-nivel-03', this).css('left', HOME.left_menu);
                });
                //$('.dropdown-sub-nivel-03', this).slideDown(800, "easeOutExpo");
                $(this).find('>a').removeClass('active');
            }
        });

        $('.navegacao nav.menu-navegacao > ul > li ul.item-dropdown-02 > li ul.item-dropdown-03 > li').hoverIntent({
            sensitivity: 3, // number = sensitivity threshold (must be 1 or higher)
            interval: 60, // number = milliseconds of polling interval
            over: function() {
                HOME.left_menu = $('.dropdown-sub-nivel-04', this).css('left');                
                $('.dropdown-sub-nivel-04', this).css('left', '-'+HOME.left_menu).show();
                $('.dropdown-sub-nivel-04', this).animate({ left: HOME.left_menu }, 200, function(){
                    $(this).removeAttr('style');
                });
                //$('.dropdown-sub-nivel-04', this).slideDown(800, "easeOutExpo");
                $(this).find('>a').addClass('active');
            },
            timeout: 60,
            out: function() {
                $('.dropdown-sub-nivel-04', this).fadeOut(200, "easeOutExpo", function(){
                    $('.dropdown-sub-nivel-04', this).css('left', HOME.left_menu);
                });
                //$('.dropdown-sub-nivel-04', this).slideDown(800, "easeOutExpo");
                $(this).find('>a').removeClass('active');
            }
        });
    },
    nav_mobile: function() {
        /*MENU MOBILE CLICAR NO ICONE*/
        $("a#mobile-nav").click(function() {
            if ($(this).hasClass('active')) {
                $(".bg-menu-mobile").fadeOut('fast');
                $(".menu-mobile").slideUp(1000, "easeInOutExpo");
                $("a#mobile-nav").removeClass('active');
            } else {
                $(".bg-menu-mobile").fadeIn('fast');
                $(".menu-mobile").slideDown(1000, "easeInOutExpo");
                $(this).addClass('active');
            }
            return false;
        });
    },
    hover_menu_mobile: function() {
        // CLICANDO NOS ICONES DE + ou - DO MENU NAVEGAÇÂO MOBILE
        $("a.btn-bullet").click(function() {
            $(this).parent().parent().find(".navegacao-mobile-conteudo").slideUp(1000, "easeInOutExpo");
            if (!$(this).hasClass('active')) {
                $(this).parent().find(".navegacao-mobile-conteudo").slideDown(1000, "easeInOutExpo");
                $("a.btn-bullet").removeClass('active');
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
            return false;
        });
    },
    menu_busca : function() {
        $('.fundo-busca').click(function(){
            $('.btn-search-fechar').click();
            $('.drop-busca').fadeOut('fast');
        });

        $('.navegacao').css('z-index', '5');

        //CLICK NO BOTÂO SEARCH
        $("a.btn-search").click(function() {
            //$(".search").show().animate({width: '100%'}, 500);
            $(".search").slideDown(800, "easeOutExpo", function(){
                $(this).css('overflow','visible');
            });
            //$('.fundo-busca').fadeIn('fast');
            return false;
        });

        $("a.btn-search-fechar").click(function() {
            $('.search .search-main .drop-busca').slideUp('fast');
            $('.search .search-main > input').val('');
            $(".search").slideUp(800, "easeOutExpo");
            $('.fundo-busca').fadeOut('fast');
            return false;
        });

        //SEARCH MOBILE QUANDO CLICA NA LUPA
        $("a.btn-search-branco").click(function() {
            if ($(this).hasClass('active')) {
                $(".bg-menu-mobile").fadeOut('fast');
                $(".search-mobile").slideUp(1000, "easeInOutExpo");
                $(".btn-search-branco").removeClass('active');
            } else {
                $(".bg-menu-mobile").fadeIn('fast');
                $(".search-mobile").slideDown(1000, "easeInOutExpo");
                $(this).addClass('active');
            }
            return false;
        });

        //SEARCH MOBILE QUANDO CLICA NO BOTAO DE FECHAR
        $("a.btn-search-fechar-mobile").click(function() {
            $(".bg-menu-mobile").fadeOut('fast');
            $(".btn-search-branco").removeClass('active');
            $(".search-mobile").slideUp(800, "easeOutExpo");
            return false;
        });
        
        //BOTÃƒO DE SUBIR TOPO
        $("a.btnTopo").click(function() {
            var target = ($.browser.opera) ? 'html' : 'html,body';
            var targetOffset = $(".wrapper").offset().top;
            $(target).animate({
                scrollTop: targetOffset
            }, 700);
            return false;
        });
    },
    busca_pagina: function(url, PS, sl, cc, sm, PageNumber, fq) {
        if( url == '' ){
            return $.ajax({
                url: '/buscapagina',
                type: 'GET',
                dataType: 'HTML',
                data: {
                    fq: fq,
                    PS: PS,
                    sl: sl,
                    cc: cc,
                    sm: sm,
                    PageNumber: PageNumber
                }
            });            
        }
        else
        {
            url = url.replace('&PageNumber=','');
            url += '&PageNumber='+PageNumber;
            return $.ajax({
                url: url,
                type: 'GET',
                dataType: 'HTML',
            }); 
        }
    },
    lazy_load : function() {        
        $('.load-assync').each(function(i, item) {
            var src='', alt='', content='', href='javascript:void(0)';

            if( $(item).is(':visible') && $(item).find('img').length == 0 && $(item).find('noscript').text() !== '' ) {

                if( $(item).find('noscript').text().search('src') > - 1 ) {
                    src = $(item).find('noscript').text().match(/src="(.*?)"/)[1];
                    if( $(item).parent().parent().parent().parent().parent().parent().parent().parent().hasClass('produto-size-g') ) {
                        src = src.replace('-390-390', '-320-320');                        
                    }
                }
                
                if( $(item).find('noscript').text().search('alt') > - 1 )
                    alt = $(item).find('noscript').text().match(/alt="(.*?)"/)[1];                
                          
                if( $(item).find('noscript').text().search('href') > -1 ) {
                    href = $(item).find('noscript').text().match(/href="(.*?)"/)[1];
                }
                
                content += '<span class="loading" style="display:block"><img src="/arquivos/ajax-loader.gif" style="margin: 0 auto;display:block" /></span>';
                
                $(item).find('noscript').text().search('box-banner') > -1 ? content += '<a href="'+href+'">' : '';

                content += '<img data-layzr="'+src+'" alt="'+alt+'" class="lazyr img-responsive" style="display:none;" />';
                
                $(item).find('noscript').text().search('box-banner') > -1 ? content += '</a>' : '';

                $(item).prepend(content);                
            }
        });

        setTimeout(function(){ DEFAULT.load_images(); }, 200);

        setTimeout(function(){
            DEFAULT.lazy_load();
        }, 800);
    },
    load_images : function() {
        $('.lazyr').not('.loading-complete').each(function(i, item){
            var carregar, obj = $(item);
            
            function loadImagem( src )
            {
                carregar = new Image();
                carregar.src = src;                
                setTimeout(function(){ verificaCarregamento(), 800 });
            }
             
            function verificaCarregamento()
            {
                if( carregar.complete )
                {   
                    obj.parent().addClass('load');
                    obj.parent().parent().find('.loading').hide();
                    obj.attr('src', carregar.src);
                    obj.addClass('loading-complete')
                    obj.fadeIn(800, 'easeOutExpo');
                }
                else
                {
                    setTimeout(function(){ verificaCarregamento(), 800 });
                }
            }
            
            loadImagem($(item).attr('data-layzr'));
        });
    },
    busca : function() {
        var intervalo, conteudo, busca;

        $('.search-mobile .search-main-mobile input').keyup(function(event) {
            if( event.keyCode == 13 ){
                window.location.href = '/'+$('.search-mobile .search-main-mobile input').val();
            }
        });

        $('.search-main > input').keyup(function(event) {
            _b = $(this);
            busca = $(this).val();
            conteudo = '';
            
            if( event.keyCode == 13 ){
                window.location.href = '/'+busca;
            }

            console.log( 'get busca' );

            clearInterval(intervalo);
            intervalo = setTimeout(function() {
                if( $.trim(busca) !== '' ) {
                    $.ajax({
                        url: '/buscaautocomplete/',
                        type: 'GET',
                        dataType: 'JSON',
                        data: {
                            maxRows: 12,
                            productNameContains: busca
                        }
                    })
                    .done(function(data) {
                        console.log("success",data);
                        $(data.itemsReturned).each(function(i,item){
                            if( item.thumb !== '' && item.thumb !== undefined )
                                conteudo += '<li><a href="'+item.href+'">'+item.name+'</a></li>';                        
                        });

                        if( conteudo == '' ){
                            _b.parent().find('.drop-busca').find('ul').html('<p style="margin-left: 20px;">Nenhum resultado encontrado!</p>');
                            _b.parent().find('.drop-busca').slideDown('fast');
                        }
                        else
                        {
                            _b.parent().find('.drop-busca').find('ul').html(conteudo);
                            _b.parent().find('.drop-busca').slideDown('fast');                          
                        }

                        $('.fundo-busca').fadeIn('fast');
                    });                
                }
                else
                {
                    $('.search-main .drop-busca ul').html('');
                    $('.search-main .drop-busca').slideUp('fast');
                }
            }, 800);
        });

        $('.search-main > .btn-search-lupa').click(function(){
            var busca = $(this).parent().find('input').val();
            window.location.href = '/'+busca;
            return false;
        });
    },
    assine_news : function() {
        $('.news form').each(function(){
            $(this).parent().append('<p class="msg-sucess col-xs-12 col-sm-12 col-md-6 col-lg-6" style="display:none;">Cadastro realizado com sucesso.</p>');
            $(this).validate({
                rules: {
                    nome: 'required',
                    email: {
                        required: true,
                        email: true
                    }
                },
                submitHandler: function(form) {
                    var news = {
                        newsInternalCampaign: 'newsletter:opt-in',
                        newsInternalPage: '_',
                        newsInternalPart: 'newsletter',
                        newsletterClientName: $(form).find('input[name="nome"]').val(),
                        newsletterClientEmail: $(form).find('input[name="email"]').val()
                    };

                    $.ajax({
                        url: '/no-cache/Newsletter.aspx',
                        type: 'POST',
                        data: news,
                        complete: function(a) {
                            $(form).fadeOut('fast', 'easeOutExpo', function(){
                                $(form).find('input[name="nome"]').val('');
                                $(form).find('input[name="email"]').val('');
                                $(form).parent().find('.msg-sucess').fadeIn('fast', 'easeOutExpo');
                                setTimeout(function(){
                                    $(form).parent().find('.msg-sucess').fadeOut('fast', 'easeOutExpo', function(){
                                        $(form).fadeIn('fast', 'easeOutExpo');
                                    });
                                }, 5000);
                            });
                        }
                    });
                }
            });
        });
    },
    scroll_menu : function() {
        
        var scroll_old = $(window).scrollTop(), scroll_new, intervalo;
        
        $(window).scroll(function() {
            clearInterval(intervalo);
            intervalo = setTimeout(function() {
                scroll_new = $(window).scrollTop();
                if( scroll_new > 100 && $(window).width() >= 700 ) {           
                    if( scroll_old > scroll_new ) {
                        console.log( ' subindo ' );
                        
                        $('.menu-flutuante-down').fadeOut('fast', function(){
                            $('.menu-flutuante-up').show().animate({top: 0}, {effect: 'easeOutExpo', duration: '800'});
                            $('.menu-flutuante-down').css({top: '-100%'});
                        });
                    }
                    else if( scroll_old < scroll_new ) {
                        console.log( ' descendo ' );
                        
                        $('.menu-flutuante-up').fadeOut('fast', function(){
                            $('.menu-flutuante-down').show().animate({top: 0}, {effect: 'easeOutExpo', duration: '800'});
                            $('.menu-flutuante-up').css({top: '-100%'});
                        });
                    }                    
                }
                else
                {
                    $('.menu-flutuante-up').fadeOut('fast', function(){
                        $('.menu-flutuante-up').css({top: '-100%'});
                    });

                    $('.menu-flutuante-down').fadeOut('fast', function(){
                        $('.menu-flutuante-down').css({top: '-100%'});
                    });
                }
                scroll_old = $(window).scrollTop();
            }, 100);
        });
    },
    qtd_cart : '',
    carrinho : function() {        
        $.ajax({
            url: '/api/checkout/pub/orderForm/',
            type: 'GET',
            async: true
        }).done(function(sacola){
            if( DEFAULT.qtd_cart !== sacola.items.length ) {
                console.log( sacola );

                var cart = '';
                
                $('.qtd_cart').text(sacola.items.length);
                DEFAULT.qtd_cart = sacola.items.length;

                $(sacola.items).each(function(i, item){
                    cart += '\
                    <li>\
                        <a class="remove-cart"></a>\
                        <a href="'+item.detailUrl+'">\
                            <figure class="load-assync"><noscript><img src="'+item.imageUrl.replace('-55-55', '-100-100')+'" class="lazyr img-responsive"/></noscript></figure>\
                            <p class="desc">\
                                '+item.name+'<br /><br />\
                                '+item.quantity+'UND. R$'+item.price+'\
                            </p>\
                        </a>\
                    </li>';
                });

                $('.drop_cart ul').html('').html(cart);
            }

            setTimeout(function(){
                DEFAULT.carrinho();
            }, 2000);
        });
    },
    drop_cart : function() {
        $('.cart-content').hoverIntent({
            sensitivity: 3, // number = sensitivity threshold (must be 1 or higher)
            interval: 60, // number = milliseconds of polling interval
            over: function() {
                $(this).find('.drop_cart').slideDown(800, "easeOutExpo");
                $(this).find('.btn-carrinho').addClass('active');
            },
            timeout: 500,
            out: function() {
                $(this).find('.drop_cart').slideUp(800, "easeOutExpo");
                $(this).find('.btn-carrinho').removeClass('active');
            }
        });

        $('.btn-carrinho-branco').click(function(){
            if( $(this).parent().find('.drop_cart').is(':visible') ){
                $(this).parent().find('.drop_cart').slideUp(800, "easeOutExpo");
            }
            else
            {
                $(this).parent().find('.drop_cart').slideDown(800, "easeOutExpo");
            }
            return false;
        });
    },    
    verificaMobile: function() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
}

var HOME = {
    left_menu: { },
    init: function() {
        
        HOME.banner();
        HOME.banner_mobile();
        HOME.carrousel_simple();
        HOME.produtos_bottom();
        HOME.modal_welcome();        

        $('.banners img').addClass('img-responsive');
        $('.banners').parent().css('padding', '0');

        $('.banners .left > div:eq(1)').addClass('bottom');
    },
    banner: function() {
        $('.banner').owlCarousel({
            items: 1,
            singleItem: true,
            navigation: true,
            navigationText: ['', ''],
            responsive: true,
            responsiveRefreshRate : 200,
            responsiveBaseWidth: window,
            transitionStyle : false,
            afterInit: function() {
                $('.banner .owl-prev').addClass('hidden-xs hidden-sm');
                $('.banner .owl-next').addClass('hidden-xs hidden-sm');
                $('.banner .owl-pagination').addClass('hidden-md hidden-lg');
                $(window).load(function(){
                    $(window).resize(function() {
                        $('.banner').data('owlCarousel').reinit();
                    });        
                });
            }
        });
    },
    banner_mobile: function() {
        $('.banner-mobile').owlCarousel({
            items: 1,
            singleItem: true,
            navigation: true,
            navigationText: ['', ''],
            afterInit: function() {
                $('.banner-mobile .owl-prev').addClass('hidden-xs');
                $('.banner-mobile .owl-next').addClass('hidden-xs');
                $(window).load(function(){
                    $(window).resize(function() {
                        $('.banner-mobile').data('owlCarousel').reinit();
                    });        
                });
            }
        });
    },    
    carrousel_simple: function() {
        $('.carrousel-simple ul .helperComplement').remove();
        // $('.carrousel-simple ul').addClass('col-md-12').addClass('col-lg-12');

        $('.carrousel-simple ul').addClass('row');
        $('.carrousel-simple ul li article').addClass('col-xs-12 col-sm-12 col-md-12 col-lg-12');
        $('.carrousel-simple ul li figure').addClass('col-xs-5 col-sm-5 col-md-5 col-lg-5');
        $('.carrousel-simple ul li .box-info').addClass('col-xs-7 col-sm-7 col-md-7 col-lg-7');

        $('.carrousel-simple ul').owlCarousel({
            items: 2,
            itemsCustom: [800, 1],
            itemsCustom: [1024, 2],
            navigation: true,
            navigationText: ['', ''],
            beforeInit: function() {

            },
            afterInit: function() {
                $('.carrousel-simple .owl-prev').addClass('hidden-xs hidden-sm hidden-md');
                $('.carrousel-simple .owl-next').addClass('hidden-xs hidden-sm hidden-md');
                $('.carrousel-simple .owl-page').addClass('hidden-lg');
                $('.carrousel-simple img').addClass('img-responsive');
                $(window).load(function(){
                    $(window).resize(function() {
                        $('.carrousel-simple ul').data('owlCarousel').reinit();
                    });        
                });
            }
        });
    },
    produtos_bottom: function() {
        var firstClick = true;

        $('.produto-size-g').addClass('hidden-xs');        
        $('.container-produtos').parent().addClass('produto-bottom-row');
        $('.container-produtos').parent().prepend('\
            <span class="loading" style="display:none;width:100%;height:100%;position:absolute;top:0;left:0;z-index:9;background:#FFF;opacity:0.8;">\
            <img src="/arquivos/ajax-loader.gif" style="margin:0 auto;display:block;position:absolute;top:50%;left:50%;margin-top:-16px;" />\
        </span>');

        $('.gray .menu ul li a').click(function() {
            var top = $(this).offset().top;
            var number = $(this).attr('href').toString().split('-');
            number = number[1];

            $('.container-produtos').parent().find('>.loading').show();

            $('body.home .gray .menu ul li').removeClass('active');
            $(this).parent().addClass('active');

            $('.container-produtos').find('.owl-next').fadeOut('fast');
            $('.container-produtos').find('.owl-prev').fadeOut('fast');

            $('.produtos-bottom-' + number).parent().find('.owl-next').fadeIn('fast');
            $('.produtos-bottom-' + number).parent().find('.owl-prev').fadeIn('fast');

            if( $(window).width() >= 640 ){
                $('div[class*="produtos-bottom"]').fadeOut(200, 'easeOutExpo');
                $('.produto-size-g').fadeOut(200, 'easeOutExpo');
            }
            else
            {
                $('div[class*="produtos-bottom"]').slideUp('fast');                
            }

            if ($('.produto-size-g .produto-size-g-' + number).html() === '') {

                DEFAULT.busca_pagina('', 1, '71063314-ff81-4143-9962-106a5993ba9f', 1, 0, number, 'H:145').done(function(data) {                    
                    $('.produto-size-g .produto-size-g-' + number).html(data);

                    $('.produto-size-g .produto-size-g-' + number).find('.helperComplement').remove();
                    $('.produto-size-g .produto-size-g-' + number).find('ul').addClass('row');
                    $('.produto-size-g .produto-size-g-' + number).find('li').addClass('hidden-xs col-md-12 col-lg-12');
                    $('.produto-size-g .produto-size-g-' + number).find('li').find('article').addClass('col-xs-12 col-sm-12 col-md-12 col-lg-12');
                    $('.produto-size-g .produto-size-g-' + number).find('li').find('article').find('figure').addClass('col-xs-4 col-sm-12 col-md-12 col-lg-12');
                    $('.produto-size-g .produto-size-g-' + number).find('li').find('article').find('.box-info').addClass('col-xs-8 col-sm-12 col-md-12 col-lg-12');
                });
            }

            if ($('.produtos-bottom-' + number).html() === '') {

                DEFAULT.busca_pagina('', 12, '71063314-ff81-4143-9962-106a5993ba9f', 4, 0, number, 'H:145').done(function(data) {
                    $('.produtos-bottom-' + number).html(data);
                    //$('.produtos-bottom-'+number).addClass('col-xs-6 col-sm-6');
                    $('.produtos-bottom-' + number).find('img').addClass('img-responsive');
                    $('.produtos-bottom-' + number).find('.helperComplement').remove();
                    $('.produtos-bottom-' + number).find('ul').addClass('item');
                    $('.produtos-bottom-' + number).find('li').addClass('col-xs-12 col-sm-12 col-md-6 col-lg-6');
                    $('.produtos-bottom-' + number).find('li').find('article').addClass('col-xs-12 col-sm-12 col-md-12 col-lg-12');
                    $('.produtos-bottom-' + number).find('li').find('article').find('figure').addClass('col-xs-5 col-sm-5 col-md-5 col-lg-5');
                    $('.produtos-bottom-' + number).find('li').find('article').find('.box-info').addClass('col-xs-7 col-sm-7 col-md-7 col-lg-7');

                    $('.produtos-bottom-' + number).find('ul').each(function() {
                        $(this).find('li').eq(1).addClass('hidden-xs');
                        $(this).find('li').eq(2).addClass('hidden-xs hidden-sm');
                        $(this).find('li').eq(3).addClass('hidden-xs hidden-sm');
                    });

                    $('.produtos-bottom-' + number).find('.prateleira').owlCarousel({
                        items: 1,
                        singleItem: true,
                        navigation: true,
                        navigationText: ['', ''],
                        afterInit: function() {
                            $('.produtos-bottom-' + number + ' .owl-prev').addClass('hidden-xs hidden-sm hidden-md hidden-lg');
                            $('.produtos-bottom-' + number + ' .owl-next').addClass('hidden-xs hidden-sm hidden-md hidden-lg');

                            $('.produtos-bottom-' + number + ' .owl-pagination').addClass('hidden-lg');
                            $('.produtos-bottom-' + number + ' .owl-pagination').addClass('hidden-lg');

                            $('.produtos-bottom-' + number).parent().append('<span class="hidden-xs hidden-sm hidden-md owl-next"></span><span class="hidden-xs hidden-sm hidden-md owl-prev"></span>');
                            
                            $('.produtos-bottom-' + number).parent().find('.owl-next').click(function(){ 
                                $('.produtos-bottom-' + number).find('.prateleira').data('owlCarousel').next();
                            });

                            $('.produtos-bottom-' + number).parent().find('.owl-prev').click(function(){ 
                                $('.produtos-bottom-' + number).find('.prateleira').data('owlCarousel').prev();
                            });                            
                        }
                    });                    

                    if( $(window).width() >= 640 ){
                        $('.produtos-bottom-' + number).fadeIn(500, 'easeOutExpo');
                        $('.produto-size-g .produto-size-g-' + number).parent().fadeIn(500, 'easeOutExpo');
                    }
                    else
                    {
                        $('.produtos-bottom-' + number).slideDown('fast');
                    }

                    setTimeout(function(){ $('.container-produtos').parent().find('.loading').hide(); }, 500);
                });
            }
            else
            {
                if( $(window).width() >= 640 ){
                    setTimeout(function(){
                        $('.produtos-bottom-' + number).fadeIn(500, 'easeOutExpo');
                        $('.produto-size-g .produto-size-g-' + number).parent().fadeIn(500, 'easeOutExpo');
                    }, 500);
                }
                else
                {
                    $('.produtos-bottom-' + number).slideDown('fast');                    
                }

                setTimeout(function(){ $('.container-produtos').parent().find('.loading').hide(); }, 500);
            }
            //console.log( firstClick, top );

            return false;
        });

        $('body.home .gray .menu ul li a:eq(0)').click();
        $('body.home .row.gray > .container .container-produtos > a').eq(0).addClass('active');

        /*MOBILE*/
        $('body.home .row.gray > .container .container-produtos > a').click(function(){
            var h = $(this).attr('href');
            $('body.home .row.gray > .container .container-produtos > a').removeClass('active');
            $(this).addClass('active');
            $('body.home .gray .menu ul li a[href="'+h+'"]').click();
            return false;
        });
    },
    modal_welcome: function(){        
        console.log('start_modal');

        //colocando o fundo preto
        createCookie('welcome', true, -1);        
        if( !readCookie('welcome') && !readCookie('welcome') == true ) {
            if( !DEFAULT.verificaMobile() && $(window).width() >= 800 ) {
                $('#start').css({position: 'fixed', top: '50%', 'margin-top': ($('#start').height() / 2)*-1});                
            }

            $('#mascara').fadeIn(1000);
            $('#start').fadeIn(800, "easeOutExpo");
        }

        $('.btn-close, #mascara').click(function(){
            createCookie('welcome', 'true', 30);
            $("#mascara").fadeOut(1000);
            $(".window").fadeOut("slow");
            return false;
        });

        //FORMULARIO DE CONTATO
        $(".formBemVindo").validate({
            //errorContainer: $(".formBemVindo .msgError"), 
            //errorLabelContainer: $(".formBemVindo .msgError"),
            rules : {
                nome: 'required',
                email: {
                    required: true,
                    email: true
                }
            },
            messages : {
                nome: 'Insira seu nome',
                email: {
                    required: 'Insira seu e-mail',
                    email: 'Insira um e-mail válido',
                }
            },
            submitHandler: function() {
                var news = {
                    newsInternalCampaign: 'newsletter:opt-in',
                    newsInternalPage: '_',
                    newsInternalPart: 'newsletter',
                    newsletterClientEmail: $('.formBemVindo input#nome').val(),
                    newsletterClientName: $('.formBemVindo input#email').val()
                };              
                
                $.ajax({
                    url: '/no-cache/Newsletter.aspx',
                    type: 'POST',
                    data: news,
                    success: function(a) {
                        console.log(a);

                        if (a.responseText != 'false') {                   
                            $('.formBemVindo input#nome, .formBemVindo input#email').val('');
                            $('.formBemVindo').fadeOut().delay(4000).fadeIn().delay(5000);
                            $(".sucesso").html('Cadastro efetuado com sucesso.').fadeIn().delay(3000).fadeOut();
                            $('.formBemVindo .btnCadastrar').attr('disabled', false).show();
                        }
                        else
                        {                            
                            $('.formBemVindo').fadeOut().delay(4000).fadeIn().delay(5000);
                            $(".sucesso").html('Erro ao cadastrar e-mail.').fadeIn().delay(3000).fadeOut();
                        }
                    }
                });
            }
        });
    },
}

var DEP = {
    init : function() {
        DEP.remove_numeros();
        APILOADMORE.prateleira();
        APILOADMORE.init();
        
        console.log( 'DEP INIT' );
        $('.box-banner').find('img').addClass('img-responsive');
    },
    remove_numeros : function() {        
        $('body.departamento .filtros-departamento a').each(function(i, item){
            var ex = $(this).text().split('(');
            $(this).text(ex[0]);
        });
    }
}

var CAT = {
    init : function() {
        console.log( 'CAT INIT' );

        $('.filtro-superior-left span').prepend( $('.resultado-busca-numero .value').eq(0).text() + ' ' );

        //$('.filtro-superior-right .selectOrdenar').prepend('<span>Selecione</span>');        
        //$('.departamento-prateleira').prepend('<a href="#" class="col-xs-4 hidden-sm hidden-md hidden-lg toogleFiltros open">Filtros <i class="fa fa-angle-right"></i></a>');
        //$('.box-banner').find('img').addClass('img-responsive');
        $('.search-multiple-navigator').prepend('<a href="#" class="col-xs-12 hidden-sm hidden-md hidden-lg toogleFiltros close">Fechar</a>');
        
        /*ORDERNAR POR*/
        $('.filtro-superior-right .selectOrdenar').click(function(){
            if( !$('.outras-descricoes',this).is(':visible') )
                $('.outras-descricoes',this).slideDown('slow', 'easeInOutExpo');
            else
                $('.outras-descricoes',this).slideUp('fast', 'easeInOutExpo');
            return false;
        });

        PRODUTO.breadcrumb();
        APILOADMORE.prateleira();
        APILOADMORE.init();
        CAT.filtros();
        CAT.produto_destaque();
        CAT.ar_condicionado();
    },
    filtros : function() {
        $('.toogleFiltros').click(function(){
            var left = $('.filtros-departamento').css('left');
            left = left.replace('px','') * 1;

            console.log( left );

            if( left >= -20 )
                $('.filtros-departamento').animate({left: '-100%'}, 1500, 'easeOutExpo');
            else
                $('.filtros-departamento').animate({left: -15}, 1500, 'easeOutExpo');

            return false;
        });
    },
    produto_destaque : function() {        
        $('.produto-destaque-banner ul li article > a').addClass('col-xs-12 col-sm-4 col-md-4 col-lg-4');
        $('.produto-destaque-banner ul li article > figure').addClass('col-xs-12 col-sm-4 col-md-4 col-lg-4');
        $('.produto-destaque-banner ul li article > .box-info').addClass('col-xs-12 col-sm-4 col-md-4 col-lg-4');

        $('.produto-destaque-banner ul li article > figure img').addClass('img-responsive');
    },
    ar_condicionado : function() {
        $('.btnCalcularAr').click(function(){
            if( !$(this).hasClass('active') ) {
                $('.boxCalcularAr').slideDown('fast');
                $(this).addClass('active');
            }
            else
            {
                $('.boxCalcularAr').slideUp('fast');
                $(this).removeClass('active');
            }
            return false;
        });
    }
}

var BUSCA = {
    init : function() {
        $(".bread-crumb ul").append('<li><a title="Resultado de Busca" href="javascript:void(0);">Resultado de Busca</a></li>');
        APILOADMORE.prateleira();
        APILOADMORE.init();
        PRODUTO.breadcrumb();        
        BUSCA.filtros();
        BUSCA.termo();
        
        console.log( 'BUSCA INIT' );
        $('.box-banner').find('img').addClass('img-responsive');
        $('.filtro-superior-left span').prepend( $('.resultado-busca-numero .value').eq(0).text() + ' ' );
        $('.filtro-superior-right .selectOrdenar').click(function(){
            if( !$('.outras-descricoes',this).is(':visible') )
                $('.outras-descricoes',this).slideDown('slow', 'easeInOutExpo');
            else
                $('.outras-descricoes',this).slideUp('fast', 'easeInOutExpo');
            return false;
        });

    },  
    filtros : function() {
        $('.search-single-navigator').prepend('<a href="#" class="col-xs-12 hidden-sm hidden-md hidden-lg toogleFiltros close">Fechar</a>');        
        $('.toogleFiltros').click(function(){
            var left = $('.filtros-departamento').css('left');
            left = left.replace('px','') * 1;

            console.log( left );

            if( left >= -20 )
                $('.filtros-departamento').animate({left: '-100%'}, 1500, 'easeOutExpo');
            else
                $('.filtros-departamento').animate({left: -15}, 1500, 'easeOutExpo');

            return false;
        });
    },
    termo : function(){
        $('<div class="termo-busca row"><div class="container"><p></p></div></div>').insertBefore('.filtro-superior');
        $('.termo-busca p').text(window.dataLayer[0].siteSearchTerm);
   }
}

var APILOADMORE = {
    url : {},
    url_default : {},
    page_number: {},
    order : '',
    init : function() {
        $("script:not([src])").each(function(){
            b=jQuery(this)[0].innerHTML;
            c=/\/buscapagina\?.+&PageNumber=/i;

            if(-1<b.search(/\/buscapagina\?/i)){
                APILOADMORE.url_default = c.exec(b),!1
                APILOADMORE.url_default = APILOADMORE.url_default[0];
            }
        });

        APILOADMORE.page_number = 1;
        APILOADMORE.url = APILOADMORE.url_default;
        
        console.log( 'init loader', APILOADMORE.url_default, APILOADMORE.page_number );

        DEFAULT.busca_pagina(APILOADMORE.url_default, '', '', '', '', APILOADMORE.page_number+1, '').done(function(data) {
            data == '' ? $('.btn-carregar-mais').text('Todos produtos carregados').addClass('inactive') : $('.btn-carregar-mais').text('Carregar mais').removeClass('inactive');
        });

        $('.fa-refresh').removeClass('fa-spin');

        $('.btn-carregar-mais').live('click', function(){
            
            if( $(this).hasClass('inactive') ) return false;
            
            $('.fa-refresh').addClass('fa-spin');
            
            setTimeout(function(){
                APILOADMORE.page_number += 1;            
                        
                DEFAULT.busca_pagina(APILOADMORE.url, '', '', '', '', APILOADMORE.page_number, '').done(function(data) {

                    data = $(data)[0];

                    console.log( 'content load', data );

                    $('.resultItemsWrapper div[id*="ResultItems_"] > .prateleira').append('<div class="vitrine-new col-xs-12 col-sm-12 col-md-12 col-lg-12" style="overflow:hidden;display:none">'+$(data).html()+'</div>');
                    
                    APILOADMORE.prateleira();
                    
                    $('.resultItemsWrapper div[id*="ResultItems_"] .prateleira').find('> .vitrine-new:last').slideDown(1500);
                    $('html,body').animate({ scrollTop: $('.resultItemsWrapper div[id*="ResultItems_"] .prateleira').find('> .vitrine-new:last').offset().top - 40 }, {duration:1800, easing: 'easeOutExpo'});

                    setTimeout(function(){ $('.fa-refresh').removeClass('fa-spin'); }, 3500);

                    DEFAULT.busca_pagina(APILOADMORE.url, '', '', '', '', APILOADMORE.page_number+1, '').done(function(data) {
                        data == '' ? $('.btn-carregar-mais').text('Todos produtos carregados').addClass('inactive') : '';
                    });
                });

            }, 1000);

            return false;
        });

        $('.search-multiple-navigator label').live('click', function() {
            
            $(this).hasClass('active') ? $(this).removeClass('active') : $(this).addClass('active');            
            
            APILOADMORE.page_number = 1;
            APILOADMORE.url = APILOADMORE.url_default;

            $('.search-multiple-navigator label.active').each(function(i, item) {
                APILOADMORE.url += '&'+$(item).find('input').attr('rel');
            });

            APILOADMORE.url += APILOADMORE.order;

            DEFAULT.busca_pagina(APILOADMORE.url, '', '', '', '', APILOADMORE.page_number, '').done(function(data) {
                data = $(data)[0];

                if( data == '' || data == undefined ){
                    data = '<span>Nenhum resultado encontrado!</span>';
                }

                console.log( 'content load filter', data );

                $('.resultItemsWrapper div[id*="ResultItems_"] > .prateleira').html('<div class="vitrine-new col-xs-12 col-sm-12 col-md-12 col-lg-12" style="overflow:hidden;display:none">'+$(data).html()+'</div>');                
                
                APILOADMORE.prateleira();
                
                $('.resultItemsWrapper div[id*="ResultItems_"] .prateleira').find('> .vitrine-new:last').slideDown(1000);
                $('html,body').animate({ scrollTop: $('.resultItemsWrapper div[id*="ResultItems_"] .prateleira').find('> .vitrine-new:last').offset().top - 40 }, {duration:1800, easing: 'easeOutExpo'});

                setTimeout(function(){ $('.fa-refresh').removeClass('fa-spin'); }, 1500);

                DEFAULT.busca_pagina(APILOADMORE.url, '', '', '', '', APILOADMORE.page_number+1, '').done(function(data) {
                    data == '' ? $('.btn-carregar-mais').text('Todos produtos carregados').addClass('inactive') : $('.btn-carregar-mais').text('Carregar mais').removeClass('inactive');
                });
            });

            return false;
        });

        $('.outras-descricoes a').click(function(){
            $('.outras-descricoes').slideUp('fast', 'easeInOutExpo');
            $('.filtro-superior-right .selectOrdenar span').text( $(this).text() ).attr('rel', $(this).attr('href') );
            
            APILOADMORE.order = '&O='+$(this).attr('href');

            APILOADMORE.page_number = 1;
            APILOADMORE.url = APILOADMORE.url_default;

            $('.search-multiple-navigator label.active').each(function(i, item) {
                APILOADMORE.url += '&'+$(item).find('input').attr('rel');
            });

            APILOADMORE.url += APILOADMORE.order;

            DEFAULT.busca_pagina(APILOADMORE.url, '', '', '', '', APILOADMORE.page_number, '').done(function(data) {
                data = $(data)[0];

                if( data == '' || data == undefined ){
                    data = '<span>Nenhum resultado encontrado!</span>';
                }

                console.log( 'content load filter', data );

                $('.resultItemsWrapper div[id*="ResultItems_"] > .prateleira').html('<div class="vitrine-new col-xs-12 col-sm-12 col-md-12 col-lg-12" style="overflow:hidden;display:none">'+$(data).html()+'</div>');                
                
                APILOADMORE.prateleira();
                
                $('.resultItemsWrapper div[id*="ResultItems_"] .prateleira').find('> .vitrine-new:last').slideDown(1000);
                $('html,body').animate({ scrollTop: $('.resultItemsWrapper div[id*="ResultItems_"] .prateleira').find('> .vitrine-new:last').offset().top - 40 }, {duration:1800, easing: 'easeOutExpo'});

                setTimeout(function(){ $('.fa-refresh').removeClass('fa-spin'); }, 1500);

                DEFAULT.busca_pagina(APILOADMORE.url, '', '', '', '', APILOADMORE.page_number+1, '').done(function(data) {
                    data == '' ? $('.btn-carregar-mais').text('Todos produtos carregados').addClass('inactive') : $('.btn-carregar-mais').text('Carregar mais').removeClass('inactive');
                });
            });

            return false;
        });
    },
    prateleira : function() {
        $('.resultItemsWrapper div[id*="ResultItems_"] .prateleira').addClass('col-xs-12 col-sm-12 col-md-12 col-lg-12');
        $('.prateleira').find('ul').find('li.helperComplement').remove();        
        $('.prateleira').find('ul').find('li').addClass('load col-xs-12 col-sm-6 col-md-4 col-lg-4');
        $('.prateleira').find('ul').find('li').find('article').addClass('col-xs-12 col-sm-12 col-md-12 col-lg-12');
        $('.prateleira').find('ul').find('li').find('img').addClass('img-responsive');

        if( $('body').hasClass('categoria') ) {
            $('.prateleira').find('ul').find('li').find('figure').addClass('col-xs-4 col-sm-12 col-md-12 col-lg-12');
            $('.prateleira').find('ul').find('li').find('.box-info').addClass('col-xs-8 col-sm-12 col-md-12 col-lg-12');
        }
        else
        if( $('body').hasClass('busca') ) {
            $('.prateleira').find('ul').find('li').find('figure').addClass('col-xs-4 col-sm-12 col-md-12 col-lg-12');
            $('.prateleira').find('ul').find('li').find('.box-info').addClass('col-xs-8 col-sm-12 col-md-12 col-lg-12');
        }
        else
        {
            $('.prateleira').find('ul').find('li').find('figure').addClass('col-xs-4 col-sm-5 col-md-12 col-lg-12');    
            $('.prateleira').find('ul').find('li').find('.box-info').addClass('col-xs-8 col-sm-7 col-md-12 col-lg-12');
        }
    }
}

var PRODUTO = {
    idProduto : '',
    init : function() {
        console.log('PRODUTO init');
        
        PRODUTO.idProduto = skuJson.skus[0].sku;
        PRODUTO.breadcrumb();
        PRODUTO.fotos();
        PRODUTO.info();
        //PRODUTO.scroll_price();
        PRODUTO.compre_junto();
        PRODUTO.prateleira_bottom();
        PRODUTO.voltagem();
    },
    breadcrumb : function() {
        $('.bread-crumb ul li:eq(0)').addClass('fa').addClass('fa-home').css({'cursor': 'pointer'}).find('a').css({'font-size': 0});
        $('.bread-crumb ul li').not('.fa').addClass('fa').addClass('fa-long-arrow-right');

        $('.bread-crumb ul li:eq(0)').click(function(){
            window.location.href = '/';
        });
    },
    fotos : function(){
        // TEMPORARY
        $('.thumbs').parent().css({'padding-left': 0});
        $('.carrousel').html('');
        $('.carrousel').parent().parent().find('.col-md-2').html('<ul class="thumbs"></ul>');
        
        //console.log( PRODUTO.load_fotos() );

        $(PRODUTO.load_fotos()).each(function(i, item){
            $('.carrousel').append('\
                <div class="item">\
                    <a href="'+item[0].Path.replace('-390-390', '-1000-1000')+'">\
                        <img data-src="'+item[0].Path.replace('-390-390', '-422-422')+'" class="img-responsive lazyOwl"/>\
                    </a>\
                </div>');
            $('.thumbs').append('<li><a href="'+i+'"><img src="'+item[0].Path.replace('-390-390', '-140-140')+'" class="img-responsive"/></a></li>');
        });

        $('.carrousel').owlCarousel({
            items: 1,
            singleItem: true,
            navigation: true,
            navigationText: ['', ''],
            lazyLoad: true,
            afterInit: function() {
                $('.produto-superior .carrousel .owl-prev').addClass('hidden-xs hidden-sm');
                $('.produto-superior .carrousel .owl-next').addClass('hidden-xs hidden-sm');

                $('.produto-superior .carrousel .owl-pagination').addClass('hidden-md hidden-lg');

                // $('.carrousel .item').zoom({
                //     //touch: true,              
                //     callback : function(item) {                        
                //         $(this).attr('src', $(this).attr('src').replace('-422-422', '-1000-1000'));
                //         $(this).css({'width': '1000px', 'height': '1000px'});
                //     }
                // }); // add zoom

                $('.carrousel .item').easyZoom();
            },
            afterLazyLoad : function(item) {
                console.log( 'after lazy - zoom qtd' );
            }
        });
        
        $('.thumbs').parent().append('<div class="container-thumbs"><a href="#" class="fa fa-chevron-up"></a><a href="#" class="fa fa-chevron-down"></a></div>');
        $('.thumbs').appendTo('.container-thumbs');

        if( $('.thumbs li').length > 5 ){
            $('.thumbs').ulslide({
                width: 87,
                height: 87,
                effect: {
                    type: 'carousel', // slide or fade
                    axis: 'y',        // x, y
                    showCount: 5,
                    distance: 5 // Distance between frames
                },
                nextButton: '.container-thumbs .fa-chevron-up',
                prevButton: '.container-thumbs .fa-chevron-down',
                duration: 800,                
            });

            $('.container-thumbs .fa-chevron-up, .container-thumbs .fa-chevron-down').fadeIn('fast');
        }        

        $('.thumbs li a').click(function(){
            $('.carrousel').data('owlCarousel').goTo( $(this).attr('href') );
            //$('.carrousel').data('owlCarousel').reinit();
            return false;
        });
    },
    info : function() {
        //$('.produto-inferior').html('<div class="col-xs-12 col-sm-12 col-md-8 col-lg-8"> <div class="menu hidden-xs col-sm-12 col-md-4 col-lg-4"> <ul> <li class="active"><a href="#resumo">Resumo do produto<i class="fa fa-angle-right"></i></a></li> <li><a href="#detalhes">Detalhes do produto<i class="fa fa-angle-right"></i></a></li> <li><a href="#especificacao">Especificações técnicas<i class="fa fa-angle-right"></i></a></li> <li><a href="#apoio">Apoio ao cliente<i class="fa fa-angle-right"></i></a></li> </ul> </div> <div class="conteudo col-xs-12 col-sm-12 col-md-8 col-lg-8"> <div class="container-conteudo"> <a href="#resumo" class="hidden-sm hidden-md hidden-lg menu-mobile-info active">Resumo do produto<i class="fa fa-angle-down"></i></a> <div class="resumo col-xs-12 col-sm-12 col-md-12 col-lg-12"> </div> </div> <div class="container-conteudo"> <a href="#detalhes" class="hidden-sm hidden-md hidden-lg menu-mobile-info">Detalhes do produto<i class="fa fa-angle-down"></i></a> <div class="detalhes col-xs-12 col-sm-12 col-md-12 col-lg-12"> </div> </div> <div class="container-conteudo"> <a href="#especificacao" class="hidden-sm hidden-md hidden-lg menu-mobile-info">Especificações técnicas<i class="fa fa-angle-down"></i></a> <div class="especificacao col-xs-12 col-sm-12 col-md-12 col-lg-12"> </div> </div> <div class="container-conteudo"> <a href="#apoio" class="hidden-sm hidden-md hidden-lg menu-mobile-info">Apoio ao cliente<i class="fa fa-angle-down"></i></a> <div class="apoio col-xs-12 col-sm-12 col-md-12 col-lg-12"> </div> </div> </div> </div>');
        
        $('.info-gerais > div > h4').each(function(i, item){            
            if( $(item).hasClass('Caracteristicas') ) {
                $('.container-conteudo .resumo').append( $(item).next('table').find('.value-field').html() );
            }

            if( $(item).hasClass('Este-Produto-Inclui') ) {
                $(item).next('table').clone().appendTo('.container-conteudo .detalhes');
            }

            if( $(item).hasClass('Especificacoes-Tecnicas') ) {
                $(item).next('table').clone().appendTo('.container-conteudo .especificacao');
            }

            if( $(item).hasClass('Apoio-ao-Cliente') ) {
                $(item).next('table').clone().appendTo('.container-conteudo .apoio');
            }
        });

        $('.container-conteudo > div table').addClass('col-xs-12 col-sm-12 col-md-12 col-lg-12');
        $('.container-conteudo > div th').addClass('col-xs-8 col-sm-6 col-md-8 col-lg-8');
        $('.container-conteudo > div td').addClass('col-xs-4 col-sm-6 col-md-4 col-lg-4');

        $('.container-conteudo a.menu-mobile-info').click(function(){
            var _this = $(this);
            if( _this.hasClass('active') ) {
                _this.next('div').slideUp(1500, 'easeOutExpo');
                _this.removeClass('active');
            }
            else
            {
                $('.container-conteudo').find('> a').removeClass('active');
                _this.addClass('active');

                $('.container-conteudo').find('> div').slideUp(1500, 'easeOutExpo');
                _this.next('div').slideDown(1500, 'easeOutExpo');
            }            
            return false;
        });

        $('.produto-inferior .menu ul li a').click(function(){
            $('.produto-inferior .menu ul li a').removeClass('active');
            $(this).addClass('active');

            var href = $(this).attr('href').replace('#', '');
            
            if( $(window).width() <= 992 ){
                $('.container-conteudo > div').slideUp(1500, 'easeOutExpo');
                $('.container-conteudo > div[class*="'+href+'"]').slideDown(1500, 'easeOutExpo');
            }
            else
            {
                $('.produto-inferior .conteudo').css({'height': $('.produto-inferior .conteudo').height(), 'overflow': 'hidden'});
                $('.container-conteudo > div').fadeOut(800, 'easeOutExpo');
                
                setTimeout(function(){
                    var h = $('.container-conteudo > div[class*="'+href+'"]').height() + 10;
                    $('.container-conteudo > div[class*="'+href+'"]').fadeIn(800, 'easeOutExpo');
                    $('.produto-inferior .conteudo').animate({height: h}, {duration: 800, easing: 'easeOutExpo'});
                    $('.produto-inferior .menu').animate({height: h+10}, {duration: 800, easing: 'easeOutExpo'});
                }, 900);
            }
            return false;
        });
    },
    top_price : 46,
    bottom_price: '',
    posicao_rol_price: '',
    limite_rol_price: '',
    scroll_price : function() {
            
        PRODUTO.bottom_price = PRODUTO.top_price + $('.produto-superior > .row > .col-md-12 > .col-md-4').height() - 50;
        
        var interval;  

        $(window).scroll(function(){
            if( $(window).width() >= 992 ) {
                clearTimeout(interval);
                interval = setTimeout(function(){
                    PRODUTO.posicao_rol_price = $('.produto-superior > .row > .col-md-12 > .col-md-4').offset().top + $('.produto-superior > .row > .col-md-12 > .col-md-4').height();
                    PRODUTO.limite_rol_price = $('.rodape-frete').offset().top - 100;

                    console.log( PRODUTO.posicao_rol_price, PRODUTO.limite_rol_price );

                    if( $(window).scrollTop() > PRODUTO.bottom_price ){
                        if( PRODUTO.limite_rol_price > PRODUTO.posicao_rol_price )
                            $('.produto-superior > .row > .col-md-12 > .col-md-4').css({ top: $(window).scrollTop() - 100 });
                    }
                    else
                    {
                        $('.produto-superior > .row > .col-md-12 > .col-md-4').css({ top: PRODUTO.top_price });
                    }
                }, 800);
            }
        });
    },
    compre_junto : function () {
        if( $('.compre-junto-content .buy-together-content').html() !== '' ) {

            $('.compre-junto, .compre-junto-content').fadeIn('fast');

            $('.compre-junto .economize strong').text( $.trim($('.buy-together-content .buy > strong:eq(2)').html().split(':')[1]) );

            $('.compre-junto-content .prateleira-compre').prepend('\
            <ul class="col-sm-12 col-md-12 col-lg-12">\
                <li class="col-sm-4 col-md-4 col-lg-4 first-item">'+$('.buy-together-content .itemA').html()+'</li>\
                <li class="col-sm-1 col-md-1 col-lg-1"><i class="fa fa-plus"></i></li>\
                <li class="col-sm-4 col-md-4 col-lg-4 second-item">'+$('.buy-together-content .itemA').html()+'</li>\
                <li class="col-sm-1 col-md-1 col-lg-1"><i class="fa equal">=</i></li>\
                <li class="col-sm-2 col-md-2 col-lg-2">\
                    <span class="valor-por">POR '+$('.buy-together-content .buy > strong:eq(1)').text().toUpperCase()+'</span>\
                    <span class="parcela">até '+$('.buy-together-content .buy > strong:eq(0)').text().replace('x','')+' vezes</span>\
                    <a href="'+$('#lnkComprar').attr('href')+'" class="btn-compre">adicionar ao carrinho</a>\
                </li>\
            </ul>');

            $('.compre-junto-content .prateleira-compre .first-item a, .compre-junto-content .prateleira-compre .first-item h3').addClass('col-sm-6 col-md-6 col-lg-6');
            $('.compre-junto-content .prateleira-compre .first-item a img').attr('src', $('.compre-junto-content .prateleira-compre .first-item a img').attr('src').replace('-90-90', '-200-200')).addClass('img-responsive');
            $('.compre-junto-content .prateleira-compre .first-item a img').addClass('img-responsive').removeAttr('width height');

            $('.compre-junto-content .prateleira-compre .second-item a, .compre-junto-content .prateleira-compre .second-item h3').addClass('col-sm-6 col-md-6 col-lg-6');
            $('.compre-junto-content .prateleira-compre .second-item a img').attr('src', $('.compre-junto-content .prateleira-compre .second-item a img').attr('src').replace('-90-90', '-200-200'));
            $('.compre-junto-content .prateleira-compre .second-item a img').addClass('img-responsive').removeAttr('width height');
        }
    },
    prateleira_bottom : function() {
        var number=1;
        var container='.prateleira-bottom';

        if( $('.notifyme.sku-notifyme').is(':visible') ) {
            container='.prateleira-bottom.produto-indisponivel ';
            $('.prateleira-bottom.produto-indisponivel').fadeIn(800, 'easeOutExpo');
            $('.prateleira-bottom:not(.produto-indisponivel)').hide();
        }
        else
        {
            container='.prateleira-bottom:not(.produto-indisponivel) ';
        }
        
        var colecao_size = $(container + '.produto-size-g .produto-size-g-' + number).text();
        var colecao_produtos = $(container + '.produtos-bottom-' + number).text();

        DEFAULT.busca_pagina('', 1, '71063314-ff81-4143-9962-106a5993ba9f', 1, 0, number, 'H:'+colecao_size).done(function(data) {                    
            $(container + '.produto-size-g .produto-size-g-' + number).html(data).fadeIn('fast','easeOutExpo');

            $(container + '.produto-size-g .produto-size-g-' + number).find('img').addClass('img-responsive');
            $(container + '.produto-size-g .produto-size-g-' + number).find('.helperComplement').remove();
            $(container + '.produto-size-g .produto-size-g-' + number).find('ul').addClass('row');
            $(container + '.produto-size-g .produto-size-g-' + number).find('li').addClass('hidden-xs col-md-12 col-lg-12');
            $(container + '.produto-size-g .produto-size-g-' + number).find('li').find('article').addClass('col-xs-12 col-sm-12 col-md-12 col-lg-12');
            $(container + '.produto-size-g .produto-size-g-' + number).find('li').find('article').find('figure').addClass('col-xs-4 col-sm-12 col-md-12 col-lg-12');
            $(container + '.produto-size-g .produto-size-g-' + number).find('li').find('article').find('.box-info').addClass('col-xs-8 col-sm-12 col-md-12 col-lg-12');                    
        });

        DEFAULT.busca_pagina('', 12, '71063314-ff81-4143-9962-106a5993ba9f', 4, 0, number, 'H:'+colecao_produtos).done(function(data) {
            $(container + '.produtos-bottom-' + number).html(data).fadeIn('fast','easeOutExpo');
            //$(container + '.produtos-bottom-'+number).addClass('col-xs-6 col-sm-6');
            $(container + '.produtos-bottom-' + number).find('img').addClass('img-responsive');
            $(container + '.produtos-bottom-' + number).find('.helperComplement').remove();
            $(container + '.produtos-bottom-' + number).find('ul').addClass('item');
            $(container + '.produtos-bottom-' + number).find('li').addClass('col-xs-12 col-sm-12 col-md-6 col-lg-6');
            $(container + '.produtos-bottom-' + number).find('li').find('article').addClass('col-xs-12 col-sm-12 col-md-12 col-lg-12');
            $(container + '.produtos-bottom-' + number).find('li').find('article').find('figure').addClass('col-xs-5 col-sm-5 col-md-5 col-lg-5');
            $(container + '.produtos-bottom-' + number).find('li').find('article').find('.box-info').addClass('col-xs-7 col-sm-7 col-md-7 col-lg-7');

            $(container + '.produtos-bottom-' + number).find('ul').each(function() {
                $(this).find('li').eq(1).addClass('hidden-xs');
                $(this).find('li').eq(2).addClass('hidden-xs hidden-sm');
                $(this).find('li').eq(3).addClass('hidden-xs hidden-sm');
            });

            $(container + '.produtos-bottom-' + number).find('.prateleira').owlCarousel({
                items: 1,
                singleItem: true,
                navigation: true,
                navigationText: ['', ''],
                afterInit: function() {
                    $(container + '.produtos-bottom-' + number + ' .owl-prev').addClass('hidden-xs hidden-sm hidden-md hidden-lg');
                    $(container + '.produtos-bottom-' + number + ' .owl-next').addClass('hidden-xs hidden-sm hidden-md hidden-lg');

                    $(container + '.produtos-bottom-' + number + ' .owl-pagination').addClass('hidden-lg');
                    $(container + '.produtos-bottom-' + number + ' .owl-pagination').addClass('hidden-lg');

                    $(container + '.produtos-bottom-' + number).parent().append('<span class="hidden-xs hidden-sm hidden-md owl-next"></span><span class="hidden-xs hidden-sm hidden-md owl-prev"></span>');
                    
                    $(container + '.produtos-bottom-' + number).parent().find('.owl-next').click(function(){ 
                        $(container + '.produtos-bottom-' + number).find('.prateleira').data('owlCarousel').next();
                    });

                    $(container + '.produtos-bottom-' + number).parent().find('.owl-prev').click(function(){ 
                        $(container + '.produtos-bottom-' + number).find('.prateleira').data('owlCarousel').prev();
                    });                            
                }
            });
        });
    },
    voltagem : function() {
        if( $('.notifyme.sku-notifyme').is(':visible') ){
            $('.portal-notify-me-ref form fieldset input.sku-notifyme-client-email').addClass('col-xs-12 col-sm-8 col-md-9 col-lg-9');
            $('.portal-notify-me-ref form fieldset input.sku-notifyme-button-ok').addClass('col-xs-12 col-sm-4 col-md-3 col-lg-3').val('Enviar');
            $('.sku-selector-container, .produto-superior>.row .frete').hide();
            return false;
        }
        else 
        if( $('.sku-selector-container > ul .skuList label').length == 1 ) {
            if( $('.sku-selector-container > ul .skuList label').attr('class').toLowerCase().search('biv') > -1 ){
                $('.sku-selector-container > ul .specification').addClass('hidden-xs hidden-sm hidden-md hidden-lg');
                $('.sku-selector-container > ul .skuList').addClass('col-xs-12 col-sm-12 col-md-12 col-lg-12');                
                $('.sku-selector-container').slideDown(800, 'easeOutExpo');
            }
            else 
            if( $('.sku-selector-container > ul .skuList label').attr('class').toLowerCase().search('n-a') > -1 ){
                $('.sku-selector-container').hide();
            }
            else
            {
                $('.sku-selector-container > ul .specification').addClass('col-xs-6 col-sm-6 col-md-6 col-lg-6 vol-unica');                
                $('.sku-selector-container > ul .skuList').addClass('col-xs-6 col-sm-6 col-md-6 col-lg-6');
                $('.sku-selector-container').slideDown(800, 'easeOutExpo');
            }
        }
        else
        {
            $('.sku-selector-container > ul .specification').addClass('col-xs-6 col-sm-6 col-md-6 col-lg-6');
            $('.sku-selector-container > ul .skuList').addClass('col-xs-6 col-sm-6 col-md-6 col-lg-6');
            $('.sku-selector-container').slideDown(800, 'easeOutExpo');
        }
    },
    load_fotos : function() {
        var fotos;
        $.ajax({
            url: '/produto/sku/'+PRODUTO.idProduto,
            type: 'GET',
            dataType: 'JSON',
            async: false     
        }).done(function(data){
            fotos = data[0].Images
        });

        return fotos;
    }
}