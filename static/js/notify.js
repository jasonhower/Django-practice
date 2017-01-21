(function(window){
 /**
  * @brief Notifier 
  *
  * @param type 1. һֱ��ʾ 2��������ʾ����  3�� ������ʾ���ޡ���������ɾ�������  4����ʱ����
  * @param para  ��������typeΪ3��4ʱ����Ч�� typeΪ3��ʾ���������ʾ֪ͨ�ĸ���  4�� ��ʾ�������ɾ����
  *
  * @return 
  */
    function Notifier() {};

    window.Notifier = Notifier;
      

    type = 1;
    queue = [];
    t = 5;
    c = 3;

    window.Notifier.ModelAll = function() {
        type = 1;
    }

    window.Notifier.ModelUpdate =  function() {
        type = 2;
    }

    window.Notifier.ModelCount = function(ct) {
        if(ct !== undefined) c = ct;
        type = 3;
    }

    window.Notifier.ModelTimeout = function(timeout) {
        if(timeout !== undefined) t = timeout;
        type = 4;
    }



    window.Notifier.HasSupport = function() {
        if(window.webkitNotifications) {
            return true;
        } else {
            return false;
        }
    }

    window.Notifier.GetPermission = function() {
        return window.webkitNotifications.checkPermission();
    }

    window.Notifier.IsGetPermission = function() {
        return (window.webkitNotifications.checkPermission() === 0);
    }

    window.Notifier.Disable = function() {
        return (window.webkitNotifications.checkPermission() === 2);
    }

    window.Notifier.RequestPermission = function(cb) {
        window.webkitNotifications.requestPermission(function() {
            if(cb) {cb(window.webkitNotifications.checkPermission() == 0)}
        });
    }



    //type = 1;�ر���һ��
    window.Notifier.Close = function(type) {
        if(type = 1) {
            tmp = queue.pop();
            tmp.cancel();
        } else {
            tmp = queue.shift();
            tmp.cancel();
        }
    }

    window.Notifier.ClosePre = function () {
        tmp = queue.pop();
        tmp.cancel();
    }

    window.Notifier.CloseLast = function () {
        tmp = queue.shift();
        tmp.cancel();
    }

    window.Notifier.CloseAll = function() {
        while(queue.length > 0) {
            var tmp =  queue.shift();
            tmp.cancel();
        }
    }


    window.Notifier.Notify = function(icon, title, body) {
      if (window.webkitNotifications.checkPermission() == 0) {

        switch(type) {
            case 2:
                if(queue.length > 0) {
                    tmp = queue.pop();
                    tmp.cancel();
                }
                break;
            case 3:
                while(queue.length >= c) {
                    tmp = queue.shift();
                    tmp.cancel();
                }
                break;
             case 4:
                setTimeout(function(){popup.cancel();},  t*1000); 
                break;
        }
        var popup = window.webkitNotifications.createNotification(icon, title, body);
        popup.show();
        var q = queue;
        popup.onclose = function(){
            var cur = q.indexOf(popup);
            if(cur >= 0) {
                q.splice(cur, 1);
            }
        };

        popup.onclick = function(){};

        queue.push(popup);
        return true;
      } else {
		RequestPermission();
		
	    }

      return false;
    }
})(window);