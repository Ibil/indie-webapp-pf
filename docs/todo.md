

serviços / comunicacao be fe : 
- serviços, loading e error msg

storyboard


++++++++++++++++++++++++++++++++++++++++++++++++++

Forms>
	preços em centimos?
	notification for sucess or error on submit

	user form:
	- user?type

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

	update stock of product in location? see api location to add stock


sales table: mostrar nomes em vez de ids...

MUST:
Gridt item : add product -> make sale
// adicionar datas de vendas no modelo, na tabela e na view

Should:
- gerir período de venda (desactivado)
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
