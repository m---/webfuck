(function () {
    'use strict';
    
    var $ = function (id) { return document.getElementById(id); };
    
    var head = function (url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.open('HEAD', url, false);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                callback(xhr.status);
            }
        };
        xhr.onerror = function (e) {
            callback(e.target.status);
        };
        xhr.send();
    };
    
    var assign = function (result) {
        //console.log(result);
        $('webfuck-result').innerHTML = '';
        if (result.length > 0) {
            result.forEach(function (value) {
                var link = document.createElement('a');
                link.className = 'btn';
                link.innerText = value;
                link.href = value;
                link.onclick = function () { chrome.tabs.create({url: value}); };
                $('webfuck-result').appendChild(link);
            });
        } else {
            var text = document.createElement('div');
            text.className = 'btn';
            text.innerText = 'nothing';
            $('webfuck-result').appendChild(text);
        }
    };
    
    var TARGET_URL = null;
    
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        TARGET_URL = new URL(tabs[0].url);
    
        // restore from cache
        if (TARGET_URL in localStorage) {
            assign(JSON.parse(localStorage[TARGET_URL]));
        }
    });
    
    $('webfuck-action-check').addEventListener('click', function () {
        if (TARGET_URL === null || TARGET_URL.origin.match(/^http/) === null) {
            console.error('WTF~~');
            return;
        }
        
        new Promise(function (resolve, reject) {
            $('webfuck-action-check').innerText = 'loading...';
            setTimeout(resolve, 10);
        }).then(function () {
            var result = [];
            var target = [TARGET_URL.origin + '/'];

            var dirname = TARGET_URL.pathname.match(/.*\//)[0];
            if (dirname !== '/') {
                target.push(TARGET_URL.origin + dirname);
            }
    
            WEBFUCK_CHECK_LIST.forEach(function (value) {
                target.forEach(function (t) {
                    t = t + value;
                    //console.log(t);
                    head(t, function (s) {
                        if (s !== 404) {
                            result.push(t);
                        }
                    });
                });
            });
    
            var filename = TARGET_URL.pathname.replace(/.*\//, '');
            if (filename !== '') {
                WEBFUCK_CHECK_LIST_EXT.forEach(function (value) {
                    var t = TARGET_URL.origin + dirname + value.replace('{filename}', filename);
                    //console.log(t);
                    head(t, function (s) {
                        if (s !== 404) {
                            result.push(t);
                        }
                    });
                });
            }
    
            localStorage[TARGET_URL] = JSON.stringify(result);
            assign(result);
    
            $('webfuck-action-check').innerText = 'check';
        });
    });
})();
