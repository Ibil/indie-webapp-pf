
import { isSameDate } from '@app/utils/utils';
import { Flex, FlexItem, InputGroup, DatePicker, isValidDate, TimePicker, yyyyMMddFormat, Button } from '@patternfly/react-core';
import React from 'react';

export const DateTimeRangePickerIlx: React.FunctionComponent = () => {
  const mockFrom = new Date();

  const mockTo = new Date();
  mockTo.setMonth(mockTo.getMonth() + 1);

  const [from, setFrom] = React.useState(mockFrom);
  const [to, setTo] = React.useState(mockTo);

  const fromValidator = date => {
    return isValidDate(to) && yyyyMMddFormat(date) <= yyyyMMddFormat(to) ? '' : 'From date must before To date';
  };

  const toValidator = date => {
    return isValidDate(from) && yyyyMMddFormat(date) >= yyyyMMddFormat(from) ? '' : 'To date must after From date';
  };

  const onFromDateChange = (inputDate, newFromDate) => {
    if (isValidDate(from) && isValidDate(newFromDate) && inputDate === yyyyMMddFormat(newFromDate)) {
      newFromDate.setHours(from.getHours());
      newFromDate.setMinutes(from.getMinutes());
    }
    if (isValidDate(newFromDate) && inputDate === yyyyMMddFormat(newFromDate)) {
      setFrom(new Date(newFromDate));
    }
  };

  const onFromTimeChange = (time, hour, minute) => {
    if (isValidDate(from)) {
      const updatedFromDate = new Date(from);
      updatedFromDate.setHours(hour);
      updatedFromDate.setMinutes(minute);
      setFrom(updatedFromDate);
    }
  };

  const onToDateChange = (inputDate, newToDate) => {
    if (isValidDate(to) && isValidDate(newToDate) && inputDate === yyyyMMddFormat(newToDate)) {
      newToDate.setHours(to.getHours());
      newToDate.setMinutes(to.getMinutes());
    }
    if (isValidDate(newToDate) && inputDate === yyyyMMddFormat(newToDate)) {
      setTo(newToDate);
    }
  };

  const onToTimeChange = (time, hour, minute) => {
    if (isValidDate(to)) {
      const updatedToDate = new Date(to);
      updatedToDate.setHours(hour);
      updatedToDate.setMinutes(minute);
      setTo(updatedToDate);
    }
  };

  // TODO when time changes, these validators need to be updated
  const fromMaxTime = () => {
    if (!isSameDate(from, to)) {
      return `23:59`;
    }
    else {
      return `${to.getHours() > 0 ? to.getHours() - 1 : `23`}:00`;
    }
  }

  const toMinTime = () => {
    if (!isSameDate(from, to)) {
      return `00:00`;
    }
    else {
      return `${from.getHours() !== 23 ? from.getHours() + 1 : `00`}:00`
    }
  }

  return (
    <Flex direction={{ default: 'column', lg: 'row' }}>
      <FlexItem>
        <InputGroup>
          <DatePicker
            value={isValidDate(from) ? yyyyMMddFormat(from) : from}
            onChange={onFromDateChange}
            validators={[fromValidator]}
            aria-label="Start date"
            placeholder="YYYY-MM-DD"
          />
          <TimePicker is24Hour
            aria-label="Start time"
            style={{ width: '150px' }}
            time={from}
            onChange={onFromTimeChange}
            maxTime={fromMaxTime()}
          />
        </InputGroup>
      </FlexItem>
      <FlexItem>
        to
      </FlexItem>
      <FlexItem>
        <InputGroup>
          <DatePicker
            value={isValidDate(to) ? yyyyMMddFormat(to) : to}
            onChange={onToDateChange}
            isDisabled={!isValidDate(from)}
            rangeStart={from}
            validators={[toValidator]}
            aria-label="End date"
            placeholder="YYYY-MM-DD"
          />
          <TimePicker is24Hour
            style={{ width: '150px' }}
            time={to}
            onChange={onToTimeChange}
            minTime={toMinTime()}
            isDisabled={!isValidDate(from)}
          />
        </InputGroup>
      </FlexItem>
      <FlexItem>
        <Button variant="primary" onClick={() => alert("sale time set")}>Set sale time</Button>
      </FlexItem>
    </Flex>
  );
}