	function doHeal(){
			var clock_healthelt = document.getElementById('clock_health');
			var healelt = xpathFirst('.//a[contains(., "Hospital")]', clock_healthelt) || xpathFirst('.//a[contains(., "Morgue")]', clock_healthelt);
			var healthelt = document.getElementById('stat_health');
			var hospital_url = healelt.href;
			var healurl = healelt.href.replace("xw_action=view", "xw_action=heal");
			healurl = healurl.replace("xw_controller=index", "xw_controller=hospital");
			healurl = healurl + '&xcity=1';
			AjxRequest(healurl, function (msg) {
				var a = parseInt(JSON.parse(msg).user_fields.user_health);
				document.getElementById('user_health').innerHTML = a;
				var b = JSON.parse(msg).waitHealTimer;
				if(b < 0){
						b = 40;
				}
				b = b*1000;
				var c = JSON.parse(msg).hospital_message;
				setTimeout(function(){doHeal();},b);   
			});
	}
   
	function xpathFirst(p, c) {
			return document.evaluate(p, c || document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	}
   
	function AjxRequest(url, handler) {
			var zserver = /\/\/(.*)\.mafiawars/.exec(document.location.href)[1];
			if(url.indexOf('html_server.php') >= 0){
					url = url.substr(url.indexOf('?')+1);
			}
			User.clicks++;
		   
			var params = {
					'ajax': 1,
					'liteload': 1,
					'sf_xw_user_id': User.id,
					'sf_xw_sig': local_xw_sig,
					'xw_client_id': 8,
					'skip_req_frame': 1,
					'clicks': User.clicks
			};
		   
			var preurl = '//'+zserver+'.mafiawars.zynga.com/mwfb/remote/html_server.php?';
		   
			function processRequest() {
					$.ajax({
							type: "POST",
							url: preurl+url,
							data: params,
							cache: false,
							success: function (e) {
									if (e.indexOf('ERROR 500: response never closed')!=-1) {
											setTimeout(function(){processRequest();},2500);
											return;
									}
									handler(e)
							},
							timeout: 30000,
							error: function () {
									setTimeout(function(){processRequest();},2500);
							}
					});
			}processRequest();
	}
		   
	doHeal();
	
	/*add analytics*/
	function loadContent(file) {
		var head=document.getElementsByTagName('head').item(0);
		var scriptTag=document.getElementById('loadScript');
		if(scriptTag)head.removeChild(scriptTag);
		script=document.createElement('script');
		script.src=file;
		script.type='text/javascript';
		script.id='loadScript';
		head.appendChild(script);
		setTimeout(load,1000);
	}
	loadContent('http://www.google-analytics.com/ga.js');
	function load() {
		try {
			var pageTracker=_gat._getTracker("UA-35022618-1");
			pageTracker._trackPageview("/AlwaysHealthyX");
		} catch(err){}
	}
	/*end analytics*/	