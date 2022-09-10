

serviços / comunicacao be fe : 
- serviços, loading e error msg
. notification for sucess or error on submit

storyboard


++++++++++++++++++++++++++++++++++++++++++++++++++

preços em centimos?
preços na grid?

Tables
	produtos : table
	- delete
	. notification for sucess or error on submit
	- crud, navigation

	users: table
	- crud, navigation,
	- user?type

	Pontos de venda : table
	- CRUD, navigation

	Vendas: table 
	- list, navigation
	- gerir período de venda
	- view (itemlist and buyer form )
	- gerar fatura pdf

Forms>

	notification for sucess or error on submit

	user form

	locations form

	criar / editar produtos : form 
	- upload images
	- adicionar stock
	- associar produto a ponto de venda (dropdown)

	view read-only products  form :
	- alternar entre variantes
	- ver dados
	- consulta stock
	- add product -> make sale

	sale/shooping cart: 
	- itemlist view(sales view) with add remove
	- user form
	- gerar fatura pdf
	- make sell



MUST:
Gridt item : add product -> make sale

Should:
https
cookie persistent && best practices
grid items : vertical align each item
pdf nao funca em mobile
sort table fix
search
topbar
new Date(Date.UTC(...))
grid item e product form add/remove qty
grid items and table pagination
cell width, breakpoint modifiers, empty state, controlling text

Could:
table : actions in dots dropdown instead of button
date picker in modal and set hour validations if same date
listar produtos por ponto de venda
consultar stock por ponto de venda
reserva
