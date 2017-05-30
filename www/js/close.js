function Unloader(){
    var o = this;
    this.unload = function(evt){
        var message = "Вы действительно хотите уйти со страницы?";
        if (typeof evt == "undefined") {
            evt = window.event;
        }
        if (evt) {
            evt.returnValue = message;
        }
        return message;
    }
 
    this.resetUnload = function()
    {
        $(window).off('beforeunload', o.unload);
 
         setTimeout(function(){
            $(window).on('beforeunload', o.unload);
        }, 1000);
    }
 
    this.init = function()
    {
        $(window).on('beforeunload', o.unload);
 
        $('a').on('click', o.resetUnload);
        $(document).on('submit', 'form', o.resetUnload);
      // F5 и Ctrl+F5, Enter
      $(document).on('keydown', function(event){
       if((event.ctrlKey && event.keyCode == 116) || event.keyCode == 116 || event.keyCode == 13){
       o.resetUnload();
       }
             });    
    }
    this.init();
}
 
$(function(){
    if(typeof window.obUnloader != 'object')
    {
        window.obUnloader = new Unloader();
    }
})