import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/ui/status-badge";
import { Users, Plus, Search, UserCheck, UserX, Mail, Phone } from "lucide-react";

export default function Guests() {
  const [searchQuery, setSearchQuery] = useState("");

  const guests = [
    {
      id: "G001",
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567",
      room: "101",
      checkInDate: "2024-01-15",
      checkOutDate: "2024-01-18",
      status: "occupied" as const,
      totalStays: 5,
      memberSince: "2023-03-15"
    },
    {
      id: "G002", 
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 234-5678",
      room: "205",
      checkInDate: "2024-01-15", 
      checkOutDate: "2024-01-20",
      status: "occupied" as const,
      totalStays: 2,
      memberSince: "2023-11-20"
    },
    {
      id: "G003",
      name: "Mike Wilson", 
      email: "mike.wilson@email.com",
      phone: "+1 (555) 345-6789",
      room: null,
      checkInDate: null,
      checkOutDate: null,
      status: "checkout" as const,
      totalStays: 8,
      memberSince: "2022-08-10"
    },
    {
      id: "G004",
      name: "Emily Davis",
      email: "emily.davis@email.com", 
      phone: "+1 (555) 456-7890",
      room: null,
      checkInDate: null,
      checkOutDate: null,
      status: "available" as const,
      totalStays: 1,
      memberSince: "2024-01-10"
    },
  ];

  const filteredGuests = guests.filter(guest =>
    guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guest.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (guest.room && guest.room.includes(searchQuery))
  );

  const getGuestStatusVariant = (status: string) => {
    switch (status) {
      case "occupied": return "occupied";
      case "checkout": return "checkout"; 
      case "available": return "available";
      default: return "available";
    }
  };

  const getGuestStatusLabel = (status: string) => {
    switch (status) {
      case "occupied": return "In-House";
      case "checkout": return "Checked Out";
      case "available": return "Guest";
      default: return "Guest";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Users className="h-8 w-8 text-primary" />
            Guest Management
          </h1>
          <p className="text-muted-foreground">
            Manage guest profiles and information
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Guest
        </Button>
      </div>

      {/* Search Bar */}
      <Card>
        <CardHeader>
          <CardTitle>Search Guests</CardTitle>
          <CardDescription>
            Find guests by name, email, or room number
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
                  placeholder="Guest name, email, or room number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guest Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Guests</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{guests.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In-House</CardTitle>
            <UserCheck className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {guests.filter(g => g.status === "occupied").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Checked Out</CardTitle>
            <UserX className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {guests.filter(g => g.status === "checkout").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">VIP Guests</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {guests.filter(g => g.totalStays >= 5).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Guests List */}
      <Card>
        <CardHeader>
          <CardTitle>Guest Directory</CardTitle>
          <CardDescription>
            All guest profiles and current status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredGuests.map((guest) => (
              <div key={guest.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">{guest.name}</h3>
                      <StatusBadge variant={getGuestStatusVariant(guest.status)}>
                        {getGuestStatusLabel(guest.status)}
                      </StatusBadge>
                      {guest.totalStays >= 5 && (
                        <StatusBadge variant="warning">VIP</StatusBadge>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>{guest.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>{guest.phone}</span>
                      </div>
                      {guest.room && (
                        <>
                          <div>
                            <strong>Current Room:</strong> {guest.room}
                          </div>
                          <div>
                            <strong>Check-out:</strong> {guest.checkOutDate}
                          </div>
                        </>
                      )}
                      <div>
                        <strong>Total Stays:</strong> {guest.totalStays}
                      </div>
                      <div>
                        <strong>Member Since:</strong> {guest.memberSince}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" className="w-32">
                      View Profile
                    </Button>
                    <Button variant="outline" className="w-32">
                      Edit Details
                    </Button>
                    {guest.status === "occupied" && (
                      <Button variant="outline" className="w-32">
                        Check Out
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