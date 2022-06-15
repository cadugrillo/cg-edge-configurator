package system

import (
	"syscall"

	ni "github.com/hilt0n/netif"
)

type InterfaceSet struct {
	InterfacePath string    `json:"InterfacePath"`
	Adapters      []Adapter `json:"Adapters"`
}

type Adapter struct {
	AddrFamily int    `json:"AddrFamily"`
	AddrSource string `json:"AddrSource"`
	Address    string `json:"Address"`
	Auto       bool   `json:"Auto"`
	Broadcast  string `json:"Broadcast"`
	Gateway    string `json:"Gateway"`
	Hotplug    bool   `json:"Hotplug"`
	Name       string `json:"Name"`
	Netmask    string `json:"Netmask"`
	Network    string `json:"Network"`
}

func GetNetworkInfo() *ni.InterfaceSet {
	is := ni.Parse(ni.Path("/etc/network/interfacess"))
	return is
}

func SetNetworkInfo(InterfaceSet InterfaceSet) *ni.InterfaceSet {

	is := ni.Parse(ni.Path("/etc/network/interfacess"))
	//is.Adapters[1].AddrSource = 1 //{1 - "dhcp", 2 - "static", 3 - "loopback", 4 - "manual"}
	//is.Adapters[1].Address = net.IPv4(192, 168, 0, 103)
	//is.Adapters[1].Netmask = net.IPv4(255, 255, 255, 0)
	//is.Adapters[1].Gateway = net.IPv4(0, 0, 0, 0)

	switch InterfaceSet.Adapters[2].AddrSource {
	case "1":
		is.Adapters[2].AddrSource = ni.DHCP //{1 - "dhcp", 2 - "static", 3 - "loopback", 4 - "manual"}
	case "2":
		is.Adapters[2].AddrSource = ni.STATIC //{1 - "dhcp", 2 - "static", 3 - "loopback", 4 - "manual"}
	case "3":
		is.Adapters[2].AddrSource = ni.LOOPBACK //{1 - "dhcp", 2 - "static", 3 - "loopback", 4 - "manual"}
	case "4":
		is.Adapters[2].AddrSource = ni.MANUAL //{1 - "dhcp", 2 - "static", 3 - "loopback", 4 - "manual"}
	}

	//is.Adapters[2].Address = net.IPv4(172, 24, 50, 114)
	//is.Adapters[2].Netmask = net.IPv4(255, 255, 255, 0)
	//is.Adapters[2].Gateway = net.IPv4(0, 0, 0, 0)

	is.Write(ni.Path("/etc/network/interfacess"))
	return is

}

func RestartHost() string {
	syscall.Sync()
	err := syscall.Reboot(syscall.LINUX_REBOOT_CMD_RESTART)
	return err.Error()
}
