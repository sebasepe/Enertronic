import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '../../core/services/language.service';

export interface SolutionItem {
  icon: string;
  titleES: string;
  titleEN: string;
  descES: string;
  descEN: string;
}

@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatIconModule],
  templateUrl: './solutions.component.html',
  styleUrl: './solutions.component.scss',
})
export class SolutionsComponent {
  public langService = inject(LanguageService);

  public solutionList: SolutionItem[] = [
    {
      icon: 'cell_tower',
      titleES: 'Solución de Telemetría Celular 2G 3G 4G',
      titleEN: '2G 3G 4G Cellular Telemetry Solution',
      descES:
        'SMART RTU (GRD) de EXEMYS ENERTRONIC brinda soluciones de monitoreo remoto y vuestra solución se centra en un dispositivo SMART RTU (GRD) con un módem celular integrado que permite la captura y transmisión eficiente de datos en tiempo real desde una amplia gama de sensores y transmisores.',
      descEN:
        'SMART RTU (GRD) by EXEMYS ENERTRONIC provides remote monitoring solutions centered on a SMART RTU device with an integrated cellular modem that enables efficient real-time data capture and transmission from sensors and transmitters.',
    },
    {
      icon: 'satellite_alt',
      titleES: 'Solución de Telemetría Satelital Iridium',
      titleEN: 'Iridium Satellite Telemetry Solution',
      descES:
        'Nuestra solución de telemetría satelital IRIDIUM combina un RTU inteligente GRD del fabricante EXEMYS, y el módem satelital EDGE de Iridium. Esta solución innovadora está diseñada para el monitoreo eficaz de pequeños volúmenes de datos provenientes de equipos como PLC, sensores y activos remotos, transmitidos a intervalos regulares hacia un centro de recepción y monitoreo.',
      descEN:
        'Our IRIDIUM satellite telemetry solution combines an EXEMYS GRD smart RTU with the Iridium EDGE satellite modem, designed for effective regular monitoring of PLC, sensor, and remote asset data.',
    },
    {
      icon: 'satellite',
      titleES: 'Solución de Telemetría Satelital STARLINK',
      titleEN: 'STARLINK Satellite Telemetry Solution',
      descES:
        'ENERTRONIC brinda soluciones personalizadas de monitoreo remoto satelital y vuestra solución se centra en el dispositivo SMART RTU (cLAN) de EXEMYS con un puerto Ethernet integrado que facilita la captura y transmisión de datos de una variedad de sensores y transmisores.',
      descEN:
        'ENERTRONIC provides customized satellite remote monitoring solutions centered on the EXEMYS SMART RTU (cLAN) device with an integrated Ethernet port facilitating data capture and transmission.',
    },
    {
      icon: 'rss_feed',
      titleES: 'Solución de Telemetría Radio Mesh 2.4GHz',
      titleEN: '2.4GHz Mesh Radio Telemetry Solution',
      descES:
        'La familia de dispositivos wRemote es una solución innovadora en Telemetría Inalámbrica de 2.4GHz, impulsada por la tecnología de redes Mesh. Este sistema ha sido especialmente diseñado para su implementación en entornos industriales o en áreas abiertas, facilitando la recolección confiable de datos remotos y dispersos.',
      descEN:
        'The wRemote device family is an innovative 2.4GHz Wireless Telemetry solution powered by Mesh network technology, designed for industrial or open environments, facilitating reliable remote data collection.',
    },
    {
      icon: 'swap_calls',
      titleES: 'Solución de Telemetría MQTT',
      titleEN: 'MQTT Telemetry Solution',
      descES:
        '¿QUÉ ES MQTT? MQTT (Message Queuing Telemetry Transport) es un protocolo de comunicación de red liviano diseñado para la transmisión de mensajes entre dispositivos en entornos de Internet Industrial de las Cosas (IIoT). Fue desarrollado para funcionar de manera eficiente en redes con ancho de banda limitado.',
      descEN:
        'MQTT (Message Queuing Telemetry Transport) is a lightweight network communication protocol designed for IIoT message transmission in bandwidth-limited environments.',
    },
    {
      icon: 'lan',
      titleES: 'Solución de Telemetría Ethernet',
      titleEN: 'Ethernet Telemetry Solution',
      descES:
        'DISPOSITIVO PARA TELEMETRÍA IIoT CON COMUNICACIÓN ETHERNET/WiFi. Con la serie de productos cLAN-XF de EXEMYS puede supervisar y controlar de manera remota a sensores, transductores o dispositivos ubicados en lugares dispersos. Modelos disponibles cLAN-1520-XF.',
      descEN:
        'IIoT Telemetry device with Ethernet/WiFi communication. With the EXEMYS cLAN-XF series, remotely supervise and control sensors, transducers, or scattered devices via Ethernet.',
    },
    {
      icon: 'wifi',
      titleES: 'Solución de Telemetría WIFI',
      titleEN: 'WiFi Telemetry Solution',
      descES:
        'Monitoreo en tiempo real de estaciones remotas, activos remotos, variables de procesos industriales, sensores, transductores, medidores de energía, PLC\'s, Datalogger y de cualquier fuente de datos que manejen protocolos industriales como Modbus RTU con interfaz física RS-232/ RS-485 y/o Modbus TCP por Ethernet.',
      descEN:
        'Real-time monitoring of remote stations, assets, industrial process variables, sensors, energy meters, PLCs, dataloggers using industrial protocols like Modbus RTU (RS-232/RS-485) and Modbus TCP.',
    },
    {
      icon: 'public',
      titleES: 'Solución de telemetría satelital inmarsat BGAN M2M',
      titleEN: 'Inmarsat BGAN M2M Satellite Telemetry Solution',
      descES:
        'Monitoreo en tiempo real de estaciones remotas, activos remotos, variables de procesos industriales, sensores, transductores, medidores de energía, PLC\'s, Datalogger y de cualquier fuente de datos que manejen protocolos industriales como Modbus RTU con interfaz física RS-232/ RS-485 y/o Modbus TCP por Ethernet.',
      descEN:
        'Real-time monitoring of remote stations and critical assets via Inmarsat BGAN M2M satellite coverage, enabling communication for industrial sensors and PLCs in remote locations.',
    },
    {
      icon: 'sensors',
      titleES: 'Solución de Telemetría LoRaWAN',
      titleEN: 'LoRaWAN Telemetry Solution',
      descES:
        'La Telemetría LoRaWAN (Long Range Wide Area Network) es un tipo de tecnología de comunicación inalámbrica diseñada para conectar dispositivos de baja potencia en Redes a larga distancia. LoRaWAN es un protocolo de Red que opera en bandas de frecuencia no licenciadas.',
      descEN:
        'LoRaWAN (Long Range Wide Area Network) wireless communication technology connects low-power devices over long distances in unlicensed frequency bands.',
    },
    {
      icon: 'transform',
      titleES: 'Túnel inalámbrico 2.4GHz',
      titleEN: '2.4GHz Wireless Tunnel',
      descES:
        'wTunnel es un innovador producto que utiliza la tecnología Radio ZigBee para reflejar las entradas de un dispositivo como salidas en otro de manera totalmente inalámbrica. Este sistema permite además la replicación de un puerto serial RS232/485 o USB.',
      descEN:
        'wTunnel uses ZigBee radio technology to mirror inputs from one device as outputs on another completely wirelessly, enabling serial RS232/485 or USB replication.',
    },
    {
      icon: 'visibility',
      titleES: 'SOLUCIONES INTEGRALES DE TELEMETRÍA, SCADA Y VISIÓN REMOTA INDUSTRIAL',
      titleEN: 'INTEGRAL TELEMETRY, SCADA & INDUSTRIAL REMOTE VISION SOLUTIONS',
      descES:
        'SECTOR MINERO INDUSTRIAL: ENERTRONIC INGENIERIA SAC continúa expandiendo sus capacidades tecnológicas para brindar soluciones cada vez más integrales y especializadas al sector minero, industrial y de infraestructura crítica. Alianza estratégica con PROVIX en visión remota.',
      descEN:
        'MINING & INDUSTRIAL SECTOR: ENERTRONIC INGENIERIA SAC expands technological capabilities for critical infrastructure, mining, and industry in strategic alliance with Canadian leader PROVIX for remote vision.',
    },
  ];
}
