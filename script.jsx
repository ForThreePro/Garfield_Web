function App() {
  const [page, setPage] = React.useState("inicio")
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [cartOpen, setCartOpen] = React.useState(false)
  const [cart, setCart] = React.useState([])
  const [time, setTime] = React.useState({d:0,h:0,m:10,s:54})

  React.useEffect(() => {
    const i = setInterval(() => {
      setTime(t => { let {d,h,m,s} = t; s--; if(s<0){s=59;m--} if(m<0){m=59;h--} if(h<0){h=23;d++} return {d,h,m,s} })
    }, 1000)
    return () => clearInterval(i)
  }, [])

  const addToCart = (prod) => {
    setCart(prev => {
      const exist = prev.find(p => p.id === prod.id)
      if(exist) return prev.map(p => p.id === prod.id? {...p, qty: p.qty + 1} : p)
      return [...prev, {...prod, qty: 1}]
    })
  }
  const removeFromCart = (id) => setCart(cart.filter(p => p.id!== id))

  const total = cart.reduce((acc, p) => acc + p.price * p.qty, 0)

  const pagarWhatsApp = () => {
    const mensaje = cart.map(p => `${p.qty}x ${p.name} - ${formatearPrecio(p.id)}`).join('\n')
    const numero = "51999999999" // CAMBIA TU NUMERO
    const url = `https://wa.me/${numero}?text=Hola ArcadiaCorps! Quiero comprar:\n${mensaje}\n\nTotal: ${formatearPrecio(total)}`
    window.open(url, '_blank')
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="h-10 bg-blue-600 w-full flex items-center justify-center text-sm font-semibold">Envíos en la mañana y noche</div>

      <header className="bg-[#0A0A0A] border-b border-zinc-800 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">☰</button>
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-600 to-orange-500 flex items-center justify-center font-bold">A</div>
          <h1 className="text-lg font-semibold">Arcadia<span className="gradient-text">Corps</span></h1>
        </div>
        <button onClick={() => setCartOpen(true)} className="relative p-2 rounded-lg bg-zinc-900">
          🛒 {cart.reduce((a,p)=>a+p.qty,0) > 0 && <span className="absolute -top-1 -right-1 bg-green-500 text-black text-xs w-5 h-5 rounded-full flex items-center justify-center">{cart.reduce((a,p)=>a+p.qty,0)}</span>}
        </button>
      </header>

      {menuOpen && (
        <div className="bg-[#0A0A0A] border-b border-zinc-800 p-4 space-y-2 animate-fade">
          <button onClick={() => {setPage("inicio"); setMenuOpen(false)}} className="w-full text-left p-2 hover:bg-zinc-900 rounded">🏠 Inicio</button>
          <button onClick={() => {setPage("tienda"); setMenuOpen(false)}} className="w-full text-left p-2 hover:bg-zinc-900 rounded">🛍️ Tienda</button>
        </div>
      )}

      {cartOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/60" onClick={() => setCartOpen(false)}></div>
          <div className="w-80 bg-[#0A0A0A] border-l border-zinc-800 p-4 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">Carrito</h2>
              <button onClick={() => setCartOpen(false)}>✕</button>
            </div>
            {cart.length === 0? <p className="text-zinc-400 text-center mt-10">Tu carrito está vacío</p> : <>
              <div className="flex-1 overflow-y-auto space-y-3">
                {cart.map(p => (
                  <div key={p.id} className="bg-zinc-900 p-3 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-sm">{p.name}</p>
                      <p className="text-green-400">{formatearPrecio(p.id)} x {p.qty}</p>
                    </div>
                    <button onClick={() => removeFromCart(p.id)} className="text-red-400">x</button>
                  </div>
                ))}
              </div>
              <div className="border-t border-zinc-800 pt-3">
                <p className="font-bold text-lg">Total: <span className="text-green-400">{formatearPrecio(total)}</span></p>
                <button onClick={pagarWhatsApp} className="w-full gradient-btn text-white py-3 rounded-lg mt-2 font-semibold">Pagar por WhatsApp</button>
              </div>
            </>}
          </div>
        </div>
      )}

      <main className="p-4 max-w-7xl mx-auto">
        {page === "inicio"? <Inicio time={time} /> : <Tienda addToCart={addToCart} />}
      </main>
    </div>
  )
}

function Inicio({ time }) {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card p-4 glow-green">
          <p className="text-sm text-zinc-400 mb-2">TIEMPO ACTIVO</p>
          <div className="grid grid-cols-4 text-center">
            {Object.entries(time).map(([k,v], i) => (
              <div key={k}>
                <p className="text-3xl font-bold text-green-500">{String(v).padStart(2,'0')}</p>
                <p className="text-xs text-zinc-500">{['DÍAS','HORAS','MIN','SEG'][i]}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="card p-4">
          <p className="text-sm text-zinc-400">USUARIOS REGISTRADOS</p>
          <p className="text-3xl font-bold text-green-500">30 <span className="text-sm font-normal text-zinc-400">PERSONAS</span></p>
          <p className="text-green-400 font-semibold mt-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            ESTADO DEL BOT: En línea
          </p>
        </div>
      </div>
    </div>
  )
}

function Tienda({ addToCart }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Todos los productos</h2>

      <div className="card p-3 bg-pink-500/10 border-pink-500/30 text-sm">
        <b>Luu Design 🩵:</b> Entrega máx 2 días. No devoluciones. Respondo tardes y noches.
      </div>
      <div className="card p-3 bg-purple-500/10 border-purple-500/30 text-sm">
        <b>Combo Decana 🎀:</b> Activa desde 7am PE. Me encargo de todos los VS si me avisas.
      </div>
      <div className="card p-3 bg-yellow-500/10 border-yellow-500/30 text-sm">
        <b>Diamantes 💎:</b> Mándame tu ID para verificar stock. Recargas en mañanas y noches.
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productos.map(p => (
          <div key={p.id} className="card p-3">
            {p.discount && <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded mb-2 inline-block">-{p.discount}%</span>}
            <p className="font-semibold mb-1">{p.name}</p>
            {p.desc && <p className="text-xs text-zinc-400 mb-1">{p.desc}</p>}
            <p className="text-xs text-yellow-400 mb-2">★ {p.rating}</p>

            {p.cat === "Diamantes"? (
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-green-400">Con Stock</span>
                  <span className="font-bold text-green-400">{formatearPrecioDiamante(p.id, true)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-red-400">Sin Stock</span>
                  <span className="font-bold text-red-400">{formatearPrecioDiamante(p.id, false)}</span>
                </div>
                <button onClick={() => addToCart({...p, price: obtenerPrecioDiamante(p.id, true)})} className="w-full mt-2 gradient-btn text-white py-2 rounded-lg text-sm font-semibold">
                  Comprar
                </button>
              </div>
            ) : (
              <>
                <p className="text-lg font-bold text-green-400">{formatearPrecio(p.id)}</p>
                <button onClick={() => addToCart({...p, price: obtenerPrecio(p.id)})} className="w-full mt-2 gradient-btn text-white py-2 rounded-lg text-sm font-semibold">
                  Añadir al carrito
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);