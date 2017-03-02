chrome.runtime.onMessage.addListener (function (request, sender, sendResponse)
{
	if (request.type === "shownotification")
	{
		var notif = chrome.notifications;
		notif.create('notify', request.opt, function () {});

		function closeNotif ()
		{
			window.focus(this);
			chrome.notifications.clear('notify');
		}

		notif.onClicked.addListener(closeNotif);
	}
});