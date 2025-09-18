import { memo, useEffect } from 'react'
import { type FilterProps, useFilter } from '~/hooks/useFilter'
import Selector, { type SelectorProps } from '~/ui/Selector'

type FilterSelectorProps = { id: keyof FilterProps } & SelectorProps

const _FilterSelector = memo(function FilterSelector({ id, ...props }: FilterSelectorProps) {
  const { addValue, decodedParams } = useFilter({ id })

  const onOptClickHandle = (valueId: string) => {
    addValue(valueId)
  }

  useEffect(() => {
    console.log(decodedParams)
  }, [decodedParams])

  return <Selector {...props} onOptClickHandle={onOptClickHandle} />
})

export default _FilterSelector
