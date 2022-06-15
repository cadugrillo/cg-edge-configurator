package system

import (
	"net"
	"syscall"

	ni "github.com/hilt0n/netif"
)

func GetNetworkInfo() *ni.InterfaceSet {
	is := ni.Parse(ni.Path("/etc/network/interfacess"))
	return is
}

func SetNetworkInfo() *ni.InterfaceSet {

	is := ni.Parse(ni.Path("/etc/network/interfacess"))
	is.Adapters[1].AddrSource = 1 //{1 - "dhcp", 2 - "static", 3 - "loopback", 4 - "manual"}
	is.Adapters[1].Address = net.IPv4(192, 168, 0, 103)
	is.Adapters[1].Netmask = net.IPv4(255, 255, 255, 0)
	is.Adapters[1].Gateway = net.IPv4(0, 0, 0, 0)

	is.Adapters[2].AddrSource = 2 //{1 - "dhcp", 2 - "static", 3 - "loopback", 4 - "manual"}
	is.Adapters[2].Address = net.IPv4(172, 24, 50, 114)
	is.Adapters[2].Netmask = net.IPv4(255, 255, 255, 0)
	is.Adapters[2].Gateway = net.IPv4(0, 0, 0, 0)

	is.Write(ni.Path("/etc/network/interfacess"))
	return is
}

func RestartHost() string {
	syscall.Sync()
	err := syscall.Reboot(syscall.LINUX_REBOOT_CMD_POWER_OFF)
	return err.Error()
}
