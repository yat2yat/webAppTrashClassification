let base64Image;
$("#upload").change(function () {
    let reader = new FileReader();
    reader.onload = function (e) {
        let dataURL = reader.result;
        $('#selected-image').attr("src", dataURL);
        base64Image = dataURL.replace("data:image/png;base64,", "");
    }
    reader.readAsDataURL($("#upload")[0].files[0]);
    $("#prediction").text("");
});

$("#predict-button").click(function () {
    let message = { image: base64Image }
    $.post("http://127.0.0.1:5000/predict", JSON.stringify(message), function (response) {
        $("#prediction").text("results: " + response.prediction[0] + " ( confidence : " + response.prediction[1] + ")");
        console.log(response);
    });
});       