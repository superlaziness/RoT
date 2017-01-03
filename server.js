import Express from "express";
import React from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import path from "path";
import Maco from "./maco";

const app = new Express();

console.log(Maco);

app.use("/static", Express.static(path.join(__dirname, "dist")));
app.get("*", (req, res) => {
	const children = renderToString(<Maco/>);
	const markup = renderToStaticMarkup(
		<Html children={children} />		
	);

	res.status(200).send(`<!doctype html>${markup}`);
});
app.listen(10000, () => {console.log("server is running!")});