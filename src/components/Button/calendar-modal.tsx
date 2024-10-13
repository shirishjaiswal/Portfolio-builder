import React from "react";
import { Calendar } from "@nextui-org/calendar";
import type { DateValue } from "@react-types/calendar";
import {
  today,
  getLocalTimeZone,
  startOfWeek,
  startOfMonth,
} from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import { Radio } from "@nextui-org/radio";
import { cn } from "@nextui-org/theme";
import { Button, ButtonGroup } from "@nextui-org/button";

const CalendarModal = () => {
  const defaultDate = today(getLocalTimeZone());
  const [value, setValue] = React.useState<DateValue>(defaultDate);
  const { locale } = useLocale();

  const now = today(getLocalTimeZone());
  const nextWeek = startOfWeek(now.add({ weeks: 1 }), locale);
  const nextMonth = startOfMonth(now.add({ months: 1 }));

  const CustomRadio = (props : any) => {
    const { children, ...otherProps } = props;

    return (
      <Radio
        {...otherProps}
        classNames={{
          base: cn(
            "flex-none m-0 h-8 bg-content1 hover:bg-content2 items-center justify-between",
            "cursor-pointer rounded-full border-2 border-default-200/60",
            "data-[selected=true]:border-primary"
          ),
          label: "text-tiny text-default-500",
          labelWrapper: "px-1 m-0",
          wrapper: "hidden",
        }}
      >
        {children}
      </Radio>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Calendar
        aria-label="Date (Presets)"
        classNames={{
          content: "w-full",
        }}
        focusedValue={value}
        nextButtonProps={{
          variant: "bordered",
        }}
        prevButtonProps={{
          variant: "bordered",
        }}
        topContent={
          <ButtonGroup
            fullWidth
            className="px-3 pb-2 pt-3 bg-content1 [&>button]:text-default-500 [&>button]:border-default-200/60"
            radius="full"
            size="sm"
            variant="bordered"
          >
            <Button onPress={() => setValue(now)}>Today</Button>
            <Button onPress={() => setValue(nextWeek)}>Next week</Button>
            <Button onPress={() => setValue(nextMonth)}>Next month</Button>
          </ButtonGroup>
        }
        value={value}
        onChange={setValue}
        onFocusChange={setValue}
      />
    </div>
  );
};

export default CalendarModal;
