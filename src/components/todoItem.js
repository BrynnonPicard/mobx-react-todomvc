import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {observable, expr} from 'mobx';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

@observer
export default class TodoItem extends React.Component {
	@observable editText = "";
	@observable tagsCode = "";

	render() {
		const {viewStore, todo} = this.props;
		return (
			<li className={[
				todo.completed ? "completed": "",
				expr(() => todo === viewStore.todoBeingEdited ? "editing" : "")
			].join(" ")}>
				<div className="view">
					<input
						className="toggle"
						type="checkbox"
						checked={todo.completed}
						onChange={this.handleToggle}
					/>
					<label onDoubleClick={this.handleEdit}>
						{todo.title}
					</label>
					<button className="destroy" onClick={this.handleDestroy} />
					<input
						ref="tagField"
						className="tagField"
						type="text"
						value={this.tagText}
						placeholder="Add a tag (ex. Urgent)"
						onChange={this.handleTagging}
						onKeyDown={this.checkKeyInput}
					/>
					<ul className="tagsList">
						{this.getTagCode(this.props.todo.tags)}
					</ul>
				</div>
				<input
					ref="editField"
					className="edit"
					value={this.editText}
					onBlur={this.handleSubmit}
					onChange={this.handleChange}
					onKeyDown={this.handleKeyDown}
				/>
			</li>
		);
	}

	handleSubmit = (event) => {
		const val = this.editText.trim();
		if (val) {
			this.props.todo.setTitle(val);
			this.editText = val;
		} else {
			this.handleDestroy();
		}
		this.props.viewStore.todoBeingEdited = null;
	};

	handleDestroy = () => {
		this.props.todo.destroy();
		this.props.viewStore.todoBeingEdited = null;
	};

	handleEdit = () => {
		const todo = this.props.todo;
		this.props.viewStore.todoBeingEdited = todo;
		this.editText = todo.title;
	};

	handleKeyDown = (event) => {
		if (event.which === ESCAPE_KEY) {
			this.editText = this.props.todo.title;
			this.props.viewStore.todoBeingEdited = null;
		} else if (event.which === ENTER_KEY) {
			this.handleSubmit(event);
		}
	};

	handleChange = (event) => {
		this.editText = event.target.value;
	};

	handleToggle = () => {
		this.props.todo.toggle();
	};

	// My code
	checkKeyInput = (event) => {
		if (event.which === ENTER_KEY) {
			var text = this.tagText;

			if (text != "" && !this.props.todo.tags.includes(text)) {
				this.props.todo.addTag(text);
			}
		}
	};

	handleTagging = (event) => {
		this.tagText = event.target.value;
		this.setState({
     tagText: ''
   });
	};

	getTagCode = (tags) => {
		var tagCode;
		tagCode = tags.map((text) =>
		  <li className="tag" key={text}>{text}</li>
		);
		return tagCode;
	}
	//End of my code

}

TodoItem.propTypes = {
	todo: PropTypes.object.isRequired,
	viewStore: PropTypes.object.isRequired
};
