import * as vscode from "vscode";

import { IApiReferenceIndexSymbol } from "../api/IApiReference";

export default class ApiTreeItem extends vscode.TreeItem {
	public children: ApiTreeItem[] = [];
	public parent!: ApiTreeItem;
	public symbol!: IApiReferenceIndexSymbol;
	public wrapperOnly: boolean = false;

	private get HasChildren() {
		return this.children.length > 0;
	}

	public get IsRoot() {
		return this.parent === null || this.parent === undefined;
	}

	constructor(symbol?: IApiReferenceIndexSymbol) {
		super(symbol ? symbol.name : "");

		this.symbol = symbol || {} as IApiReferenceIndexSymbol;
		this.update();
	}

	public update() {
		this.id = this.symbol.name;
		this.label = this.IsRoot ? this.symbol.name : this.symbol.name.replace(`${this.parent.symbol.name}.`, "");
		this.collapsibleState = this.HasChildren ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None;
	}
}