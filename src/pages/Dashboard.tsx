import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Bed, Users, Calendar, DollarSign } from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Rooms",
      value: "120",
      description: "Available rooms in hotel",
      icon: Bed,
      color: "text-primary"
    },
    {
      title: "Occupied Rooms",
      value: "85",
      description: "Currently occupied",
      icon: Users,
      color: "text-occupied"
    },
    {
      title: "Today's Arrivals",
      value: "12",
      description: "Expected check-ins",
      icon: Calendar,
      color: "text-success"
    },
    {
      title: "Revenue Today",
      value: "$4,520",
      description: "Daily earnings",
      icon: DollarSign,
      color: "text-primary"
    }
  ];

  const recentReservations = [
    { id: "R001", guest: "John Smith", room: "101", status: "confirmed" as const, checkin: "Today" },
    { id: "R002", guest: "Sarah Johnson", room: "205", status: "pending" as const, checkin: "Tomorrow" },
    { id: "R003", guest: "Mike Wilson", room: "312", status: "confirmed" as const, checkin: "Today" },
    { id: "R004", guest: "Emily Davis", room: "108", status: "cancelled" as const, checkin: "Yesterday" },
  ];

  const roomStatus = [
    { room: "101", status: "occupied" as const, guest: "John Smith" },
    { room: "102", status: "available" as const, guest: null },
    { room: "103", status: "maintenance" as const, guest: null },
    { room: "104", status: "checkout" as const, guest: "Jane Doe" },
    { room: "105", status: "available" as const, guest: null },
    { room: "106", status: "occupied" as const, guest: "Bob Johnson" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your hotel management system
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Reservations */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Reservations</CardTitle>
            <CardDescription>
              Latest booking activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReservations.map((reservation) => (
                <div key={reservation.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {reservation.guest}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Room {reservation.room} • {reservation.checkin}
                    </p>
                  </div>
                  <StatusBadge variant={reservation.status}>
                    {reservation.status}
                  </StatusBadge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Room Status */}
        <Card>
          <CardHeader>
            <CardTitle>Room Status</CardTitle>
            <CardDescription>
              Current room availability
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roomStatus.map((room) => (
                <div key={room.room} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Room {room.room}
                    </p>
                    {room.guest && (
                      <p className="text-sm text-muted-foreground">
                        {room.guest}
                      </p>
                    )}
                  </div>
                  <StatusBadge variant={room.status}>
                    {room.status}
                  </StatusBadge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}