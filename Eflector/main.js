    // API call
    function processImage() {
       
        var subscriptionKey = "448a2d83b49d45268d89ed45c674008a";

       
        var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";

        // Request parameters.
        var params = {
            "returnFaceId": "true",
            "returnFaceLandmarks": "false",
            "returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
        };

        // Display the image.
        var sourceImageUrl = document.getE
        lementById("inputImage").value;
        document.querySelector("#sourceImage").src = sourceImageUrl;

        // Perform the REST API call.
        $.ajax({
            url: uriBase + "?" + $.param(params),

            // Request headers.
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },

            type: "POST",

            // Request body.
            data: '{"url": ' + '"' + sourceImageUrl + '"}',
        })

        .done(function(data) {
            // Show formatted JSON on webpage.
            $("#responseTextArea").val(JSON.stringify(data, null, 2));
        })

        .fail(function(jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
                jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
        });
    };


// Data Filtering

function analyze_emotion(){
    var json_data = JSON.parse(document.getElementById("responseTextArea").value);
    var emotions = json_data[0].faceAttributes.emotion;
    var emotion_expressed = Math.max(emotions.anger, emotions.contempt, emotions.disgust, emotions.fear, emotions.happiness, emotions.neutral, emotions.sadness, emotions.surprise);
    for(x in emotions){
      if(emotions[x]==emotion_expressed)
      {
        emotion_expressed = x;
        break;
      }
    }
   //document.getElementById('emotion_value').innerHTML = emotion_expressed;
   //var emoji = document.getElementById("emoji").src;
    switch(emotion_expressed){
        case "anger":
            document.getElementById("emoji").src = "img/anger.png";
        break;
            
        case "happiness":
            document.getElementById("emoji").src = "img/happy.png";
        break;
        
        case "sadness":
            document.getElementById("emoji").src = "img/sadness.png";
        break;
        
        case "contempt":
            document.getElementById("emoji").src = "img/contempt.png";
        break;
            
        case "disgust":
            document.getElementById("emoji").src = "img/disgust.png";
        break;
            
        case "fear":
            document.getElementById("emoji").src = "img/fear.png";
        break;
            
        case "surprise":
            document.getElementById("emoji").src = "img/surprise.png";
        break;
            
        case "neutral":
            document.getElementById("emoji").src = "img/neutral.png";
        break;      
    }
  }
  function timeOut(){
    setTimeout(analyze_emotion, 8000);
  }