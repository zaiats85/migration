---
---
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
	<xsl:template match="/">
		<html xmlns="http://www.w3.org/1999/xhtml">
			<head>
				<title>XML Sitemap</title>
				<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
				<style type="text/css">
					body {font-family:"Lucida Grande","Lucida Sans Unicode",Tahoma,Verdana; font-size:1em;}
					#intro {color: white;background-color: #222;border-radius: 6px;margin: 10px auto;padding: 13px 0;text-align: center;letter-spacing: 0.1em;}
					#title {color: black;font-size: 1.4em;font-weight: bold;margin-left: 10px;margin-right: auto;margin-bottom: auto;text-align: center;}
					#content {margin-right: auto;margin-left: auto;}
					td {font-size:0.8em;}
					th {color:#614e47 ;text-align:left; padding-right:30px; font-size:0.95em;background-color:whitesmoke;}
					tr.high {background-color:whitesmoke;}
					a {color:black;text-decoration:none;}
					tr.high a {color:#333;font-weight:600;}
					#counter {padding: 6px;color: black;background-color: #edd100;border-radius: 30px;font-weight: bolder;letter-spacing: 0.01;}
				</style>
			</head>
			<body>
				<div id="title" >{{site.url}} - sitemap</div>
				<div id="intro">
				{% assign counter_1 = '0' %}
				{% for page in site.pages %}
				{% if page.sitemap %}
					{% capture counter_1 %}{{ counter_1 | plus:'1' }}{% endcapture %}
				{% endif %}
				{% endfor %}
				
				{% assign counter_2 = '0' %}
				{% for post in site.posts %}
				{% if post.sitemap %}
					{% capture counter_2 %}{{ counter_2 | plus: '1' }}{% endcapture %}
				{% endif %}
				{% endfor %}
					<p>Number of URLs in this sitemap: <span id="counter">{{ counter_1 | plus: counter_2 | plus:'1'}}</span></p>
				
				</div>
					<table align="center" cellpadding="5" id="content">
						<tr style="border-bottom:1px black solid;">
							<th>URL</th>
							<th>Priority</th>
							<th>Change Frequency</th>
							<th>Last Change (GMT)</th>
						</tr>
						<xsl:variable name="lower" select="'abcdefghijklmnopqrstuvwxyz'"/>
						<xsl:variable name="upper" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'"/>
						<xsl:for-each select="sitemap:urlset/sitemap:url">
						<xsl:sort select="sitemap:priority" order="descending"/>
							<tr>
								<xsl:if test="position() mod 2 != 1">
									<xsl:attribute  name="class">high</xsl:attribute>
								</xsl:if>
								<td>
									<xsl:variable name="itemURL">
										<xsl:value-of select="sitemap:loc"/>
									</xsl:variable>
									<a href="{$itemURL}">
										<xsl:value-of select="sitemap:loc"/>
									</a>
								</td>
								<td>
									<xsl:value-of select="sitemap:priority"/>
								</td>
								<td>
									<xsl:value-of select="concat(translate(substring(sitemap:changefreq, 1, 1),concat($lower, $upper),concat($upper, $lower)),substring(sitemap:changefreq, 2))"/>
								</td>
								<td>
									<xsl:value-of select="concat(substring(sitemap:lastmod,0,12),concat(' ', substring(sitemap:lastmod,12,5)))"/>
								</td>
							</tr>
						</xsl:for-each>
					</table>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>