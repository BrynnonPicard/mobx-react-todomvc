import {observable} from 'mobx';

export default class TodoModel {
	store;
	id;
	@observable title;
	@observable completed;
	@observable tags;

	constructor(store, id, title, completed, tags) {
		this.store = store;
		this.id = id;
		this.title = title;
		this.completed = completed;
		this.tags = tags;
	}

	toggle() {
		this.completed = !this.completed;
	}

	destroy() {
		this.store.todos.remove(this);
	}

	setTitle(title) {
		this.title = title;
	}

	// My code
	addTag(text) {
		this.tags.push(text);
	}
	//End of my code

	toJS() {
		return {
			id: this.id,
			title: this.title,
			completed: this.completed,
			tags: this.tags
		};
	}

	static fromJS(store, object) {
		return new TodoModel(store, object.id, object.title, object.completed, object.tags);
	}
}
