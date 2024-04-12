'use client';

import { BellIcon, Cookie, CreditCard, Inbox, TicketPlus, LayoutDashboard , ReceiptIndianRupee, MessageSquare, Settings, User } from "lucide-react";
// import UserItem from "./UserItem";
import { Command, CommandGroup, CommandItem, CommandList } from "./ui/command";
import Link from 'next/link'

export default function Sidebar() {
  const menuList = [
    {
      group: "General",
      items: [
        {
          link: "/dashboard",
          icon: <LayoutDashboard />,
          text: "Dashboard"
        },
        {
          link: "/students",
          icon: <User />,
          text: "Students"
        },
        {
          link: "/fee",
          icon: <TicketPlus />,
          text: "Fee"
        },
        {
          link: "/payments",
          icon: <ReceiptIndianRupee />,
          text: "Payments"
        }
      ]
    },
    {
      group: "Settings",
      items: [
        {
          link: "/setting",
          icon: <Settings />,
          text: "General Settings"
        },
        {
          link: "/Privacy",
          icon: <Cookie />,
          text: "Privacy"
        },
        {
          link: "/Notification",
          icon: <MessageSquare />,
          text: "Notifications"
        }
      ]
    }
  ]

  return <div className="fixed flex flex-col gap-4 w-[170px] border-r min-h-screen p-4">
    <div className="grow">
      <Command style={{ overflow: 'visible' }}>
        <CommandList style={{ overflow: 'visible' }}>
          {menuList.map((menu, key) => (
            <CommandGroup key={key} heading={menu.group}>
              {menu.items.map((option, optionKey) =>
              <Link key={optionKey} href={option.link || '/'} passHref>
                <CommandItem key={optionKey} className="flex gap-2 cursor-pointer">
                  {option.icon}
                  {option.text}
                </CommandItem>
              </Link>
              )}
            </CommandGroup>
          ))}
        </CommandList>
      </Command>

    </div>
    <div>Settings / Notifications</div>
  </div>;
}