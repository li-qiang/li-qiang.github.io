(function(window){
	$(document).ready(function(){
		new LeaderList('blogLeader');
	});

	var LeaderIterm = function(element){
		console.log('el', element);
		$(element).bind('click', function(){
			$(this).toggleClass('active');
		})
	}

	var LeaderList = function(id){
		var _list = $('#' + id).find('.leader-list');
		console.log(_list.find('.leader-item'), '22');
		this.iterms = _list.find('.leader-item').toArray().map(function(el){ return new LeaderIterm(el); });
	}
	
})(window);