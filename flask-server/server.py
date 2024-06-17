# # .\venv\Scripts\activate

# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import os
# from langchain_community.document_loaders import PyPDFLoader, DirectoryLoader
# from langchain.prompts import PromptTemplate
# from langchain_community.embeddings import HuggingFaceEmbeddings
# from langchain_community.vectorstores import FAISS
# from langchain_community.llms import LlamaCpp  # Import LlamaCpp for BioMistral
# from langchain.chains import RetrievalQA


# DB_FAISS_PATH = 'vectorstore/db_faiss'


# custom_prompt_template = """Use the following pieces of information to answer the user's question.
# If you don't know the answer, just say that you don't know, don't try to make up an answer.

# Context: {context}
# Question: {question}

# Only return the helpful answer below and nothing else.
# Helpful answer:
# """

# def set_custom_prompt():
#     """
#     Prompt template for QA retrieval for each vectorstore
#     """
#     prompt = PromptTemplate(template=custom_prompt_template,
#                             input_variables=['context', 'question'])
#     return prompt

# # Retrieval QA Chain
# def retrieval_qa_chain(llm, prompt, db):
#     qa_chain = RetrievalQA.from_chain_type(llm=llm,
#                                            chain_type='stuff',
#                                            retriever=db.as_retriever(search_kwargs={'k': 2}),
#                                            return_source_documents=True,
#                                            chain_type_kwargs={'prompt': prompt}
#                                            )
#     return qa_chain

# # Loading the model
# def load_llm():
#     # Load the locally downloaded model here
#     llm = LlamaCpp(
#         model_path="BioMistral-7B.Q4_K_M.gguf",
#         temperature=0.5,
#         max_new_tokens=2048
#     )
#     return llm

# # QA Model Function
# def qa_bot():
#     embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2",
#                                        model_kwargs={'device': 'cpu'})
#     db = FAISS.load_local(DB_FAISS_PATH, embeddings)
#     llm = load_llm()
#     qa_prompt = set_custom_prompt()
#     qa = retrieval_qa_chain(llm, qa_prompt, db)

#     return qa

# # Output function
# def final_result(query):
#     qa_result = qa_bot()
#     response = qa_result({'query': query})
#     return response


# app = Flask(__name__)
# CORS(app)

# @app.route("/members")
# def members():
#     return {"members":["Member1", "Member2", "Member3", "Member4"]}

# if __name__ == "__main__" :
#     app.run(debug=True)


from langchain_community.document_loaders import PyPDFLoader, DirectoryLoader
from langchain.prompts import PromptTemplate
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_community.llms import LlamaCpp  # Import LlamaCpp for BioMistral
from langchain.chains import RetrievalQA
from flask import Flask, jsonify, request
import json

app = Flask(__name__)

DB_FAISS_PATH = 'vectorstore/db_faiss'

# Custom prompt template for QA retrieval
custom_prompt_template = """Use the following pieces of information to answer the user's question.
If you don't know the answer, just say that you don't know, don't try to make up an answer.

Context: {context}
Question: {question}

Only return the helpful answer below and nothing else.
Helpful answer:
"""

def set_custom_prompt():
    """
    Prompt template for QA retrieval for each vectorstore
    """
    prompt = PromptTemplate(template=custom_prompt_template,
                            input_variables=['context', 'question'])
    return prompt

def retrieval_qa_chain(llm, prompt, db):
    """
    Create a RetrievalQA chain
    """
    qa_chain = RetrievalQA.from_chain_type(llm=llm,
                                           chain_type='stuff',
                                           retriever=db.as_retriever(search_kwargs={'k': 2}),
                                           return_source_documents=True,
                                           chain_type_kwargs={'prompt': prompt}
                                           )
    return qa_chain

def load_llm():
    """
    Load the LlamaCpp model
    """
    llm = LlamaCpp(
        model_path="BioMistral-7B.Q4_K_M.gguf",
        temperature=0.5,
        model_kwargs={'device': 'cpu', 'max_new_tokens': 2048}
    )
    return llm

def qa_bot():
    """
    Create the QA bot using RetrievalQA chain
    """
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2",
                                       model_kwargs={'device': 'cpu'})
    db = FAISS.load_local(DB_FAISS_PATH, embeddings, allow_dangerous_deserialization=True)
    llm = load_llm()
    qa_prompt = set_custom_prompt()
    qa = retrieval_qa_chain(llm, qa_prompt, db)

    return qa

@app.route('/')
def hello_world():
    """
    Default route
    """
    return 'Hello, World!'

@app.route('/ask_ai', methods=['POST'])
def ask():
    """
    Endpoint for asking a question to the bot
    """
    # data = Flask.request.json
    data = json.loads(request.data.decode('utf-8'))
    prompt = data['prompt']
    print(prompt)

    qa_result = qa_bot()
    response = qa_result({'query': prompt})  # Assuming the context is empty for now
    # reply = response["response"]

    print(response["result"])

    # query = Flask.request.json.get('query')
    # qa_result = qa_bot()
    # response = qa_result({'query': query})
    # return response["response"]
    return  jsonify({'result':  response["result"]})

if __name__ == '__main__':
    app.run()
