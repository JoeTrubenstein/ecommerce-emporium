$(document).on("click", "#plus", function(e) {
  e.preventDefault();

  let priceValue = parseFloat($("#priceValue").val());
  let quantity = parseFloat($("#quantity").val());

  priceValue += parseFloat($("#priceHidden").val());
  quantity += 1;

  $("#quantity").val(quantity);
  $("#priceValue").val(priceValue.toFixed(2));
  $("#total").html(quantity);

});

$(document).on("click", "#minus", function(e) {
    e.preventDefault();
    
    let priceValue = parseFloat($("#priceValue").val());
    let quantity = parseFloat($("#quantity").val());
  
    priceValue -= parseFloat($("#priceHidden").val());
    quantity -= 1;
  
    $("#quantity").val(quantity);
    $("#priceValue").val(priceValue.toFixed(2));
    $("#total").html(quantity);
  
});
