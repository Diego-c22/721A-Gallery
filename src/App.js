import React, { useEffect, useState } from 'react'
import './App.css'
import { getNft } from './API'
import InfiniteScroll from 'react-infinite-scroll-component'

const categories = ['Volcanic', 'Spirit', 'Harsh', 'Decay', 'Growth', 'Psychedelic']
const environments = ['Steppes', 'Ruins', 'Mystic', 'Thornwood', 'Sludge', 'Plague', 'Sands']

const App = () => {
  const [items, setItems] = useState([])
  const [currentIndex, setCurrentIndex] = useState(1)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    getItems()
  }, [])

  const getItems = async () => {
    console.log(currentIndex, 'here')
    const data = await Promise.all(
      Array.from(new Array(30), (x, i) => i + currentIndex).map(async (num) => await getNft(`https://api.otherside.xyz/lands/${num}`))
    )
    console.log('data', data)
    console.log('items', items)
    const updatedData = [...items, ...data]
    console.log('updateData', updatedData)
    setCurrentIndex(currentIndex + 30)
    setItems(old => [...old, ...data])
  }

  const handleScroll = async () => {
    const userScrollHeight = window.innerHeight + window.scrollY
    const windowBottomHeight = document.documentElement.offsetHeight
    if (userScrollHeight >= windowBottomHeight) {
      await getItems()
    }
  }
  return (
    <div className="App flex">
      <InfiniteScroll
        dataLength={items.length}
        next={getItems}
        hasMore={true}
        loader={<h3>Loading ...</h3>}
      >
        <div className="h-screen fixed w-1/5 right-0 shadow-2xl">
          <h2 className="text-4xl font-bold text-gray-500 font-mono m-1">Filter</h2>
          <h3 className="text-xl mb-4 mt-5">Category</h3>
          {categories.map((cat) => (
            <button type="button" key={cat} className="border-t p-1 w-full">
              {cat}
            </button>
          ))}

          <h3 className="text-xl mb-4 mt-6">Environments</h3>
          {environments.map((env) => (
            <button type="button" key={env} className="border-t p-1 w-full">
              {env}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-4/5 p-3">
        {items.map((item, key) => (
          <div className="rounded-t-2xl m-2 shadow-2xl rounded-b-md" key={key}>
            <img className="rounded-t-2xl" src={item.image} alt="hola" />
            <div className="pb-1">
              <p className="font-bold">{item?.attributes[0]?.value}</p>
              <p>{item?.attributes[3]?.value}</p>
            </div>
          </div>
        ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default App
