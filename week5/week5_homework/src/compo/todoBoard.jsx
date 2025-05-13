import { useState } from 'react'
import '../App.css'
import TodoList from './todoList'

// TodoBoard 컴포넌트는 필터 버튼과 리스트를 보여주는 컴포넌트입니다.

// 필터버튼의 색상을 바꾸는 방법
// fillterState(전체,완료,미완료)를 통해 className을 동적 할당하는 방식으로 구현하였습니다.
// 동적할당하는 방식은 map함수 + filter + 삼항연산자를 통해 구현하였습니다. 간결하게 구현하였습니다.

export default function TodoBoard({items, setItems}) {
  const [filterState, setFilterState] = useState('전체')
  const filterList = ['전체', '완료', '미완료'];
  const emptyText = {
    '전체' : '할 일이 없습니다',
    '완료' : '완료한 일이 없습니다',
    '미완료' : '미완료된 일이 없습니다'
  } 

  // 돔요소를 리스트로 만들어두고 filter로 뽑는 방식을 채택했습니다.
  // filter를 먼저 한 후 map을 통해 돔 요소를 만들 경우 실제 인덱스와 사용자에게 보여지는 인덱스가 달라 오작동을 합니다. 
  // 이를 해결하기 위해 돔요소를 먼저 리스트로 만들어두고 filter로 뽑는 방식으로 구현하였습니다.
  let list_dom = items.map((item, index) => {
    return <TodoList key={index} id={item.id} item={item} setItems = {setItems}/>
  })

  let list_rendering;

  if (filterState === '전체') {
    list_rendering = list_dom;
  } else if (filterState === '완료') {
    list_rendering = list_dom.filter((_, i) => items[i].isChecked === true);
  } else if (filterState === '미완료') {
    list_rendering = list_dom.filter((_, i) => items[i].isChecked === false);
  }

  return (
    <>
      {/* 필터 버튼들 */}
      <div className='flex'>
        {filterList.map((filter) => (
          <div
            key={filter}
            className={`filter-btn ${filterState === filter ? 'color-fill' : ''}`}
            onClick={() => setFilterState(filter)}
          >
            {filter}
          </div>
        ))}
      </div>

      {/* 리스트를 보여주는 부분 */}
      {list_rendering.length > 0 ? 
        list_rendering.map((item) => item) 
        : <div>{emptyText[filterState]}</div>}
    </>
  )
}
