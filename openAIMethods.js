const express = require('express');
const env = require('dotenv').config();

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

 const getResponse = async (req,res)=>{

	try{
		console.log(req.body)
		const {prompt} = req.body;
		if(!prompt || prompt==''){
			res.status(400).json({
				status:false,
				message:'prompt can\'t be empty'
			});
		}

		const response = await openai.createCompletion({
		  model: "text-davinci-003",
		  prompt,
		  temperature: 0,
		  max_tokens: 1000,
		});

		const data = response.data.choices[0].text;

		res.status(200).json({
			status:true,
			data:data
		});

	}catch(error){
		res.status(400).json({
			status:false,
			message:'unable to generate output'
		})		
	}
		
}

module.exports = {getResponse};
