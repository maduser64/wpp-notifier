var activated = true; // checkbox in extension's options menu
var	online = false;
var	offline = false;
var	typing = false;

window.onload = function ()
{
	window.focus (); // keeps script running in background
}

setInterval ( function () 
{ // check the contact status every second
	if (activated) 
	{
		var chat_status;
			try 
			{
				chat_status = document.getElementById ('main').getElementsByClassName ('chat-status ellipsify'); // captures the conversation status

				if (chat_status.length > 0) // check if is there any status to compare
				{
					var chat_title = document.getElementById ('main').querySelector ('.chat-title'); // captures the person name on the chat
					var avatar_url = document.getElementById ('main').querySelector ('.avatar-image').getAttribute ('src'); // captures the avatar URL for notifying


					/* the set of comparsions below avoids the notification from being shown every second until the contact goes offline */

					if (chat_status[0].innerText == 'online' && online == false) 
					{
						// console.log (chat_title.innerText + ' is ' + chat_status[0].innerText + '.');
						changeStatus(chat_status[0].innerText);
						notify (chat_title.innerText, chat_status[0].innerText, avatar_url);
					}

					else if (chat_status[0].innerText == 'typing…' && typing == false) // watch out the periods... zuckerberg bots, oops, coders used a special ' … '
					{
						// console.log (chat_title.innerText + ' is ' + chat_status[0].innerText + '.');
						changeStatus(chat_status[0].innerText);
						notify (chat_title.innerText, chat_status[0].innerText, avatar_url);
					}

					else
					{
						//c hangeStatus('offline'); // if it returns any other text in status
					}
				}

				else 
				{
					changeStatus('offline'); // if it doesn't return any text in status
				}	
			}

			catch (error) // in case the line 19 returns an empty collection
			{
				// console.log ('Nothing to catch...');
			}
	}

}, 1000);

function changeStatus (value)
{
	if (value == 'online') 
	{
		offline = false;
		typing = false;
		online = true;
	}

	else if (value == 'typing')
	{
		offline = false;
		online = false;
		typing = true;
	}

	else 
	{
		typing = false;
		online = false;
		offline = true;
	}
}

function notify (name, status, url)
{
	var options = 
	{
		type: "basic",
		message: "WhatsApp Online/Typing Notification",
		title: name + " is " + status + ".",
		iconUrl: url
	};

	chrome.runtime.sendMessage ( {type: "shownotification", opt: options}, function () {} ); // sends message to background.js (which will handle the notification)
}

function activateOrDeactivate (isActive) // to be implemented
{
	if (isActive == true)
		isActive = false;

	else
		isActive = true;
}