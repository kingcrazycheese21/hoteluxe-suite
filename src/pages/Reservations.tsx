import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/ui/status-badge";
import { Calendar, Plus, Search, Filter } from "lucide-react";

export default function Reservations() {
  const [searchQuery, setSearchQuery] = useState("");

  const reservations = [
    {
      id: "R001",
      confirmationNumber: "HT001234",
      guestName: "John Smith",
      room: "101",
      checkInDate: "2024-01-15",
      checkOutDate: "2024-01-18",
      adults: 2,
      children: 0,
      roomType: "Deluxe King",
      status: "confirmed" as const,
      totalAmount: 450.00
    },
    {
      id: "R002", 
      confirmationNumber: "HT001235",
      guestName: "Sarah Johnson",
      room: "205",
      checkInDate: "2024-01-15",
      checkOutDate: "2024-01-20",
      adults: 1,
      children: 1,
      roomType: "Standard Queen",
      status: "pending" as const,
      totalAmount: 320.00
    },
    {
      id: "R003",
      confirmationNumber: "HT001236", 
      guestName: "Mike Wilson",
      room: "312",
      checkInDate: "2024-01-16",
      checkOutDate: "2024-01-19",
      adults: 2,
      children: 0,
      roomType: "Suite",
      status: "confirmed" as const,
      totalAmount: 750.00
    },
    {
      id: "R004",
      confirmationNumber: "HT001237",
      guestName: "Emily Davis", 
      room: "108",
      checkInDate: "2024-01-14",
      checkOutDate: "2024-01-16",
      adults: 1,
      children: 0,
      roomType: "Standard Queen",
      status: "cancelled" as const,
      totalAmount: 280.00
    },
  ];

  const filteredReservations = reservations.filter(reservation =>
    reservation.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    reservation.confirmationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    reservation.room.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Calendar className="h-8 w-8 text-primary" />
            Reservations
          </h1>
          <p className="text-muted-foreground">
            Manage guest bookings and reservations
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Reservation
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search Reservations</CardTitle>
          <CardDescription>
            Find reservations by guest name, confirmation number, or room
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Guest name, confirmation number, or room..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-end">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reservations List */}
      <Card>
        <CardHeader>
          <CardTitle>All Reservations</CardTitle>
          <CardDescription>
            Current and upcoming reservations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReservations.map((reservation) => (
              <div key={reservation.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">{reservation.guestName}</h3>
                      <StatusBadge variant={reservation.status}>
                        {reservation.status}
                      </StatusBadge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                      <div>
                        <strong>Confirmation:</strong> {reservation.confirmationNumber}
                      </div>
                      <div>
                        <strong>Room:</strong> {reservation.room} ({reservation.roomType})
                      </div>
                      <div>
                        <strong>Guests:</strong> {reservation.adults} Adults
                        {reservation.children > 0 && `, ${reservation.children} Children`}
                      </div>
                      <div>
                        <strong>Check-in:</strong> {reservation.checkInDate}
                      </div>
                      <div>
                        <strong>Check-out:</strong> {reservation.checkOutDate}
                      </div>
                      <div>
                        <strong>Total:</strong> ${reservation.totalAmount.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" className="w-24">
                      Edit
                    </Button>
                    <Button variant="outline" className="w-24">
                      View
                    </Button>
                    {reservation.status === "pending" && (
                      <Button variant="destructive" className="w-24">
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}